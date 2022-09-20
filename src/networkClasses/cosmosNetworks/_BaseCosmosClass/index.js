import api from '../../../api'
import state from '../../../state'
import { hashMnemonic } from '../../../helpers/hashMnemonic'
import cosmos from 'cosmos-lib'
import { checkDelegationTypes } from '../../../helpers/checkArguments'
import { mnemonicToSeed } from 'bip39'
import { BaseNetwork } from '../../_BaseNetworkClass'
import { ECPair, bip32 } from 'bitcoinjs-lib'
import {
  signTxByPrivateKey,
  createMessageSignatureByPrivateKey,
  signTxByLedger,
  createMessageSignatureByLedger,
} from './signers'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../../constants'
import errors from '../../../errors'
import { getHdDerivationPath, getBech32FromPK } from '../../_functions/ledger'
import { getLedgerApp } from './signers/getLedgerApp'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import CosmosApp from 'ledger-cosmos-js'
import { debugConsole } from '../../../helpers/debugConsole'

export class BaseCosmosNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById(specialExplorerKey) {
    return `https://www.mintscan.io/${specialExplorerKey || this.net}/account/${
      this.address
    }`
  }

  getTransactionURLByHash(hash, specialExplorerKey) {
    return `https://www.mintscan.io/${
      specialExplorerKey || this.net
    }/txs/${hash}`
  }

  async getFees(token) {
    try {
      return await super.getFees(token)
    } catch {
      // return stub on error
      return {
        medium: { fee: 0, speed: 5, gasPrice: 0 },
        low: { fee: 0, speed: 5, gasPrice: 0 },
        high: { fee: 0, speed: 5, gasPrice: 0 },
        highest: { fee: 0, speed: 5, gasPrice: 0 },
      }
    }
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath, this.publicKey)
    }
    // privateKey signer
    return signTxByPrivateKey(transaction, privateKey, this.publicKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return await createMessageSignatureByLedger(data, derivationPath)
    }
    // privateKey signer
    return createMessageSignatureByPrivateKey(data, privateKey)
  }

  async prepareCrossNetworkTransfer(
    token,
    { toNetwork, toAddress, amount, fee, memo, isTyped = false }
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
      isTyped
    })
    return data
  }

  async prepareDelegation({
    nodeAddress,
    amount,
    type = DELEGATION_TYPES.STAKE,
    redelegateNodeAddress,
    isTyped = false
  }) {
    // check type
    checkDelegationTypes(type)

    // redelegation
    if (type === DELEGATION_TYPES.REDELEGATE) {
      const { data } = await api.requests.prepareRedelegation({
        address: this.address,
        net: this.net,
        from: nodeAddress,
        to: redelegateNodeAddress,
        amount: Math.abs(amount),
        publicKey: this.publicKey,
        isTyped
      })
      return data
    }

    // stake and unstake
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
              : // unstake
                -Math.abs(amount),
        },
      ],
      publicKey: this.publicKey,
      isTyped
    })

    return data
  }

  async prepareClaim({isTyped = false}) {
    const { data } = await api.requests.prepareClaim({
      net: this.net,
      address: this.address,
      isTyped
    })

    return data
  }

  static async createWalletByMnemonic(
    { mnemonic, derivationPath, passphrase = '' },
    specialAddressPrefix
  ) {
    // generate address, public and private keys
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const master = bip32.fromSeed(seed)
    const keyPair = master.derivePath(derivationPath)
    const address = cosmos.address.getAddress(
      keyPair.publicKey,
      specialAddressPrefix || this.net
    )
    const privateKey = keyPair.privateKey.toString('hex')
    const publicKey = keyPair.publicKey.toString('hex')

    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey,
      type: WALLET_TYPES.ONE_SEED,
      isCosmosNetwork: true,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties from networks.json
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(mnemonic),
      }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }, specialAddressPrefix) {
    try {
      // generate address and public key
      privateKey = privateKey.replace('0x', '')
      const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'))

      const address = cosmos.address.getAddress(
        keyPair.publicKey,
        specialAddressPrefix || this.net
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
        // add optional properties from networks.json
        ...(this.fee_key && { fee_key: this.fee_key }),
        ...(this.bridges && { bridges: this.bridges }),
        // additional fields for chrome extension
        ...(state.getState('isExtension') && {
          hashedMnemonic: hashMnemonic(),
        }),
      }
    } catch (error) {
      // error means invalid private key
      debugConsole.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
  }

  static async createWalletByLedger({ derivationPath }, specialAddressPrefix) {
    // prepare ledger app
    const ledgerApp = await getLedgerApp()

    const hdPath = getHdDerivationPath(derivationPath)
    const resp = await ledgerApp.cosmosApp?.getAddressAndPubKey(
      hdPath,
      specialAddressPrefix || this.net
    )

    if (!resp?.bech32_address) {
      const error = new Error(resp?.error_message)
      error.code = resp?.return_code
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
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }

  // alternative wallet factory (for some cosmos networks)
  static async createWalletByLedger_2(
    { derivationPath },
    specialAddressPrefix
  ) {
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
      specialAddressPrefix || this.net,
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
      // add optional properties from networks.json
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }
}
