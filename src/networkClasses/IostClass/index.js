import api from '../../api'
import { checkDelegationTypes } from '../../helpers/checkArguments'
import { derivePath } from 'ed25519-hd-key'
import bs58 from 'bs58'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../constants'
import errors from '../../errors'
import { BaseNetwork } from '../_BaseNetworkClass'
import { mnemonicToSeed } from 'bip39'
import { signTxByPrivateKey, MessageSigner } from './signers'
import { registerAccount } from './functions/registerAccount'
import { genAddress } from './functions/genAddress'

export class IostNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://www.iostabc.com/account/${this.address}?activetab=1&listtab=0&page=1&rowsPerPage=20`
  }

  getTransactionURLByHash(hash) {
    return `https://www.iostabc.com/tx/${hash}`
  }

  getFees() {
    errors.throwError('MethodNotSupported', {
      method: 'getFees',
      net: this.net,
    })
  }

  async prepareDelegation({
    nodeAddress,
    amount,
    type = DELEGATION_TYPES.STAKE,
  }) {
    type === DELEGATION_TYPES.REDELEGATE &&
      errors.throwError('MethodNotSupported', {
        message: `"${this.net}" network is not support ${DELEGATION_TYPES.REDELEGATE}" method`,
      })

    checkDelegationTypes(type)
    // send difference of values
    const { data } = await api.requests.prepareDelegations({
      from: this.address,
      net: this.net,
      delegations: [
        {
          address: nodeAddress,
          value:
            type === DELEGATION_TYPES.STAKE
              ? // stake
                Math.abs(amount)
              : // unstake
                -Math.abs(amount),
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

  async prepareGasPledge(amount) {
    const { data } = await api.requests.prepareGasPledge({
      net: this.net,
      address: this.address,
      publicKey: this.publicKey,
      toAddress: this.address,
      amount,
    })

    return data
  }

  async prepareGasUnpledge(amount) {
    const { data } = await api.requests.prepareGasUnpledge({
      net: this.net,
      address: this.address,
      publicKey: this.publicKey,
      toAddress: this.address,
      amount,
    })

    return data
  }

  async signTransaction(rawTransaction, { privateKey }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    privateKey = bs58.decode(privateKey)
    return await signTxByPrivateKey(
      transaction,
      privateKey,
      Buffer.from(this.publicKey, 'hex'),
      this.address
    )
  }

  async createMessageSignature(data, { privateKey }) {
    const signer = new MessageSigner({ message: data })
    await signer.addPublishSign(
      this.address,
      'ed25519',
      Buffer.from(this.publicKey, 'hex'),
      Buffer.from(bs58.decode(privateKey), 'hex')
    )
    return signer.getData().signature
  }

  async signAndSend(...args) {
    const hash = await super.signAndSend(...args)
    // check transatcion status after send
    let status = null
    while (status !== 'ok') {
      const { data } = await api.requests.checkTransaction({
        net: this.net,
        address: this.address,
        hash,
      })
      if (status === 'failed') {
        errors.throwError('RequestError', { message: data.reason })
      }
      status = data.status
    }
    return hash
  }

  static async getAccountsByPrivateKey(privateKey) {
    // dynamic import of large module (for fast init)
    const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
    await sodiumsumo.ready
    let keys
    try {
      keys = sodiumsumo.crypto_sign_ed25519_sk_to_seed(
        Buffer.from(bs58.decode(privateKey), 'hex')
      )
    } catch (error) {
      console.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }

    const keyPair = sodiumsumo.crypto_sign_seed_keypair(keys)
    const bs58publicKey = bs58.encode(Buffer.from(keyPair.publicKey))

    const { data } = await api.externalRequests.getIostAccounts({
      bs58publicKey,
    })
    return data?.accounts || null
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
    account,
  }) {
    // dynamic import of large module (for fast init)
    const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
    // generate address, public and private keys
    await sodiumsumo.ready
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const keys = derivePath(derivationPath, seed).key.slice(0, 32)
    const keyPair = sodiumsumo.crypto_sign_seed_keypair(keys)
    const address = await genAddress(keyPair.publicKey)
    const publicKeyHex = Buffer.from(keyPair.publicKey).toString('hex')
    await registerAccount(account || address, this.net, publicKeyHex)

    return {
      net: this.net,
      address: account || address,
      publicKey: publicKeyHex,
      derivationPath,
      privateKey: bs58.encode(keyPair.privateKey),
      type: WALLET_TYPES.ONE_SEED,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey, account }) {
    // dynamic import of large module (for fast init)
    const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')

    // generate address and public key
    await sodiumsumo.ready
    let keys
    try {
      keys = sodiumsumo.crypto_sign_ed25519_sk_to_seed(
        Buffer.from(bs58.decode(privateKey), 'hex')
      )
    } catch (error) {
      console.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }

    const keyPair = sodiumsumo.crypto_sign_seed_keypair(keys)
    const address = await genAddress(keyPair.publicKey)
    const publicKeyHex = Buffer.from(keyPair.publicKey).toString('hex')

    await registerAccount(account || address, this.net, publicKeyHex)
    return {
      net: this.net,
      address: account || address,
      publicKey: publicKeyHex,
      privateKey,
      derivationPath: null,
      type: WALLET_TYPES.PRIVATE_KEY,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties from networks.json
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static decodePrivateKeyByPassword(encodedPrivateKey, password) {
    return bs58.encode(
      Buffer.from(
        super.decodePrivateKeyByPassword(encodedPrivateKey, password),
        'hex'
      )
    )
  }

  static encodePrivateKeyByPassword(privateKey, password) {
    // do not change format for backwards compatibility
    return super.encodePrivateKeyByPassword(
      Buffer.from(bs58.decode(privateKey)).toString('hex'),
      password
    )
  }
}
