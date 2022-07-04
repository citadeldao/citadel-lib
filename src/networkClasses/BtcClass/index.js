import errors from '../../errors'
import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
import { BaseNetwork } from '../_BaseNetworkClass'
import { WALLET_TYPES } from '../../constants'
import { signTxByPrivateKey, signTxByLedger, signTxByTrezor } from './signers'
import { prepareTrezorConnection } from '../_functions/trezor'
import { bip32PublicToEthereumPublic } from '../_functions/crypto'
import { mnemonicToSeed } from 'bip39'
import { ECPair, payments, bip32, networks } from 'bitcoinjs-lib'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import BtcApp from '@ledgerhq/hw-app-btc'
import TrezorConnect from 'trezor-connect'

export class BtcNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://www.blockchain.com/ru/search?search=${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://blockchair.com/bitcoin/transaction/${hash}`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath)
    }
    // trezor signer
    if (this.type === WALLET_TYPES.TREZOR) {
      return await signTxByTrezor(transaction, derivationPath)
    }
    // privateKey signer
    return signTxByPrivateKey(transaction, privateKey)
  }

  // btc not support stake
  getStakeList() {
    errors.throwError('MethodNotSupported', {
      method: 'getStakeList',
      net: this.net,
    })
  }

  // btc not support stake
  getDelegationFee() {
    errors.throwError('MethodNotSupported', {
      method: 'getDelegationFee',
      net: this.net,
    })
  }

  // btc not support stake
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
    // generate address, public and private keys
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const hdMaster = bip32.fromSeed(seed, networks.bitcoin)
    const keyPair = hdMaster.derivePath(derivationPath)
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey })
    const publicKey = keyPair.publicKey.toString('hex')
    const privateKey = keyPair.toWIF()
    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey,
      type: WALLET_TYPES.ONE_SEED,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(mnemonic),
      }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    try {
      // generate address and public key
      const keyPair = ECPair.fromWIF(privateKey)
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
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
  }

  static async createWalletByLedger({ derivationPath }) {
    // add global btc ledger app to avoid ledger reconnect error
    if (!global.ledger_btc) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(1000)
      global.ledger_btc = new BtcApp(transport)
    }
    // generate address and public key
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
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }

  static async createWalletByTrezor({ derivationPath }) {
    // prepare Trezor
    await prepareTrezorConnection()
    // generate address and public key
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
      // add optional properties from networks.json
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }

  static decodePrivateKeyByPassword(encodedPrivateKey, password) {
    return Buffer.from(
      super.decodePrivateKeyByPassword(encodedPrivateKey, password),
      'hex'
    ).toString()
  }

  static encodePrivateKeyByPassword(privateKey, password) {
    // do not change format for backwards compatibility
    const keyPair = ECPair.fromWIF(privateKey)
    const wif = keyPair.toWIF()
    return super.encodePrivateKeyByPassword(
      Buffer.from(wif).toString('hex'),
      password
    )
  }
}
