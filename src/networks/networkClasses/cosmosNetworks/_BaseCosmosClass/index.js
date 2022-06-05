import api from '../../../../api'
import cosmos from 'cosmos-lib'
import { mnemonicToSeed } from 'bip39'
import BaseNetwork from '../../_BaseNetworkClass'
import { ECPair, bip32 } from 'bitcoinjs-lib'
import {
  signTxByPrivateKey,
  createMessageSignatureByPrivateKey,
  signTxByLedger,
  createMessageSignatureByLedger,
} from './signers'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../../../constants'
import errors from '../../../../errors'
import { checkTypes } from '../../../../helpers/checkArguments'
import { getHdDerivationPath, getBech32FromPK } from '../../_functions/ledger'
import { getLedgerApp } from './signers/getLedgerApp'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import CosmosApp from 'ledger-cosmos-js'

export default class BaseCosmosNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById(specialNetKey) {
    return `https://www.mintscan.io/${specialNetKey || this.net}/account/${
      this.address
    }`
  }

  getTransactionURLByHash(hash, specialNetKey) {
    return `https://www.mintscan.io/${specialNetKey || this.net}/txs/${hash}`
  }

  async getFees(token) {
    try {
      return await super.getFees(token)
    } catch {
      return {
        medium: { fee: 0, speed: 5, gasPrice: 0 },
        low: { fee: 0, speed: 5, gasPrice: 0 },
        high: { fee: 0, speed: 5, gasPrice: 0 },
        highest: { fee: 0, speed: 5, gasPrice: 0 },
      }
    }
  }

  async prepareTransfer(options) {
    checkTypes(['fee', options.fee, ['String', 'Number'], true])
    return await super.prepareTransfer({
      ...options,
      publicKey: this.publicKey,
    })
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction = rawTransaction.transaction || rawTransaction
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath, this.publicKey)
    }
    return signTxByPrivateKey(transaction, privateKey, this.publicKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    if (this.type === WALLET_TYPES.LEDGER) {
      return await createMessageSignatureByLedger(data, derivationPath)
    }

    return createMessageSignatureByPrivateKey(data, privateKey)
  }

  async prepareCrossNetworkTransfer(
    token,
    { toNetwork, toAddress, amount, fee, memo }
  ) {
    const { data } = await api.requests.buildBridge({
      version: '1.0.2',
      net: token,
      address: this.address,
      targetNet: toNetwork,
      to: toAddress,
      publicKey: this.publicKey,
      // token,
      amount,
      fee,
      memo,
    })
    return data
  }

  async prepareDelegation({
    nodeAddress,
    amount,
    type = DELEGATION_TYPES.STAKE,
    redelegateNodeAddress,
  }) {
    checkTypes(['amount', amount, ['String', 'Number'], true])
    !Object.values(DELEGATION_TYPES).includes(type) &&
      errors.throwError('WrongArguments', {
        message: `Invalid type of delegation. Expected '${Object.values(
          DELEGATION_TYPES
        ).join(', ')}', got '${type}'`,
      })

    if (type === DELEGATION_TYPES.REDELEGATE) {
      const { data } = await api.requests.prepareRedelegation({
        address: this.address,
        net: this.net,
        from: nodeAddress,
        to: redelegateNodeAddress,
        amount: Math.abs(amount),
        publicKey: this.publicKey,
      })
      return data
    }

    // send difference of values
    const { data } = await api.requests.prepareDelegations({
      from: this.address,
      net: this.net,
      delegations: [
        {
          address: nodeAddress,
          value:
            type === DELEGATION_TYPES.STAKE
              ? Math.abs(amount)
              : -Math.abs(amount),
        },
      ],
      publicKey: this.publicKey,
    })

    return data
  }

  async prepareClaim() {
    const { data } = await api.requests.prepareClaim({
      net: this.net,
      address: this.address,
    })

    return data
  }

  static async createWalletByMnemonic(
    { mnemonic, derivationPath, passphrase = '' },
    specialCreateKey
  ) {
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const master = bip32.fromSeed(seed)
    const keyPair = master.derivePath(derivationPath)
    const address = cosmos.address.getAddress(
      keyPair.publicKey,
      specialCreateKey || this.net
    )
    const privateKey = keyPair.privateKey.toString('hex')
    const publicKeyHex = keyPair.publicKey.toString('hex')

    return {
      net: this.net,
      address,
      publicKey: publicKeyHex,
      derivationPath,
      privateKey,
      type: WALLET_TYPES.ONE_SEED,
      isCosmosNetwork: true,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }, specialCreateKey) {
    privateKey = privateKey.replace('0x', '')
    let keyPair
    try {
      keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))
    } catch (error) {
      console.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
    const address = cosmos.address.getAddress(
      keyPair.publicKey,
      specialCreateKey || this.net
    )
    const publicKeyHex = keyPair.publicKey.toString('hex')

    return {
      net: this.net,
      address,
      publicKey: publicKeyHex,
      privateKey,
      derivationPath: null,
      type: WALLET_TYPES.PRIVATE_KEY,
      isCosmosNetwork: true,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  // Ledger wallet factory
  static async createWalletByLedger({ derivationPath }, specialCreateKey) {
    const ledgerApp = await getLedgerApp()

    const hdPath = getHdDerivationPath(derivationPath)
    const resp = await ledgerApp.cosmosApp?.getAddressAndPubKey(
      hdPath,
      specialCreateKey || this.net
    )

    if (!resp) return
    if (!resp.bech32_address) {
      const error = new Error(resp.error_message)
      error.code = resp.return_code
      throw error
    }

    return {
      net: this.net,
      address: resp.bech32_address,
      publicKey: resp.compressed_pk.toString('hex'),
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      isCosmosNetwork: true,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  // alternative wallet factory (for some cosmos networks)
  static async createWalletByLedger_2({ derivationPath }, specialCreateKey) {
    const transport = await TransportWebUSB.create(1000)
    const cosmosApp = new CosmosApp(transport)
    const hdPathArray = getHdDerivationPath(derivationPath)
    const resp = await cosmosApp.publicKey(hdPathArray)
    if (!resp?.compressed_pk || resp?.return_code !== 0x9000) {
      const error = new Error(resp.error_message)
      error.code = resp.return_code
      throw error
    }

    const address = getBech32FromPK(
      specialCreateKey || this.net,
      Buffer.from(resp.compressed_pk.buffer)
    )
    await transport.close()

    return {
      net: this.net,
      address,
      publicKey: resp.compressed_pk.toString('hex'),
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      isCosmosNetwork: true,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }
}
