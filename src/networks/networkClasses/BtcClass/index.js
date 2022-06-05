import BaseNetwork from '../_BaseNetworkClass'
import { ECPair, payments, bip32, networks } from 'bitcoinjs-lib'
import { signTxByPrivateKey, signTxByLedger, signTxByTrezor } from './signers'
import { WALLET_TYPES } from '../../../constants'
import errors from '../../../errors'
import { mnemonicToSeed } from 'bip39'
import { checkTypes } from '../../../helpers/checkArguments'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import BtcApp from '@ledgerhq/hw-app-btc'
import { prepareTrezorConnection } from '../_functions/trezor'
import { bip32PublicToEthereumPublic } from '../_functions/crypto'
import TrezorConnect from 'trezor-connect'

export default class Btc extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://www.blockchain.com/ru/search?search=${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://blockchair.com/bitcoin/transaction/${hash}`
  }

  async prepareTransfer(options) {
    checkTypes(['fee', options.fee, ['String', 'Number'], true])
    return await super.prepareTransfer(options)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction = rawTransaction.transaction || rawTransaction
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath)
    }
    if (this.type === WALLET_TYPES.TREZOR) {
      return await signTxByTrezor(transaction, derivationPath)
    }
    return signTxByPrivateKey(transaction, privateKey)
  }

  getStakeList() {
    errors.throwError('MethodNotSupported', {
      method: 'getStakeList',
      net: this.net,
    })
  }

  getDelegationFee() {
    errors.throwError('MethodNotSupported', {
      method: 'getDelegationFee',
      net: this.net,
    })
  }

  static getStakeNodes() {
    errors.throwError('MethodNotSupported', {
      method: 'getStakeNodes',
      net: this.net,
    })
  }

  static calculateBalance({ mainBalance = 0 } = {}) {
    return mainBalance
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
  }) {
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const hdMaster = bip32.fromSeed(seed, networks.bitcoin)
    const keyPair = hdMaster.derivePath(derivationPath)
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey })
    const publicKeyHex = keyPair.publicKey.toString('hex')
    return {
      net: this.net,
      address,
      publicKey: publicKeyHex,
      derivationPath,
      privateKey: keyPair.toWIF(),
      type: WALLET_TYPES.ONE_SEED,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    let keyPair
    try {
      keyPair = ECPair.fromWIF(privateKey)
    } catch (error) {
      console.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey })
    const publicKeyHex = keyPair.publicKey.toString('hex')
    return {
      net: this.net,
      address,
      publicKey: publicKeyHex,
      privateKey: keyPair.toWIF(),
      derivationPath: null,
      type: WALLET_TYPES.PRIVATE_KEY,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByLedger({ derivationPath }) {
    if (!global.ledger_btc) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(1000)
      global.ledger_btc = new BtcApp(transport)
    }

    const { publicKey, bitcoinAddress } =
      await global.ledger_btc.getWalletPublicKey(derivationPath)

    return {
      net: this.net,
      address: bitcoinAddress,
      publicKey,
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByTrezor({ derivationPath }) {
    await prepareTrezorConnection()
    const publicData = await TrezorConnect.getPublicKey({
      path: derivationPath,
      coin: 'btc',
    })
    !publicData.success &&
      errors.throwError('TrezorError', {
        message: publicData?.payload?.error,
      })
    const pub = publicData.payload.publicKey
    const buf = bip32PublicToEthereumPublic(Buffer.from(pub, 'hex'))
    const publicKey = buf.toString('hex')

    const data = await TrezorConnect.getAddress({
      path: derivationPath,
      showOnTrezor: true,
    })

    const { address } = data.payload

    return {
      net: this.net,
      address: address.toString(),
      publicKey,
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.TREZOR,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static decodePrivateKeyByPassword(encodedPrivateKey, password) {
    return Buffer.from(
      super.decodePrivateKeyByPassword(encodedPrivateKey, password),
      'hex'
    ).toString()
  }

  static encodePrivateKeyByPassword(privateKey, password) {
    const keyPair = ECPair.fromWIF(privateKey)
    const wif = keyPair.toWIF()
    return super.encodePrivateKeyByPassword(
      Buffer.from(wif).toString('hex'),
      password
    )
  }
}
