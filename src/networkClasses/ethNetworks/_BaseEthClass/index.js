import state from '../../../state'
import { hashMnemonic } from '../../../helpers/hashMnemonic'
import { BaseNetwork } from '../../_BaseNetworkClass'
import api from '../../../api'
import { signTxByLedger, signTxByTrezor, signTxByPrivateKey } from './signers'
import { pubToAddress, privateToPublic } from 'ethereumjs-util'
import { mnemonicToSeed } from 'bip39'
import hdkey from 'hdkey'
import { WALLET_TYPES } from '../../../constants'
import errors from '../../../errors'
import { prepareTrezorConnection } from '../../_functions/trezor'
import { bip32PublicToEthereumPublic } from '../../_functions/crypto'
import TrezorConnect from 'trezor-connect'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import EthApp from '@ledgerhq/hw-app-eth'
import { signTypedData } from '@metamask/eth-sig-util'

export class BaseEthNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // alternative ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath, this.net)
    }
    // trezor signer
    if (this.type === WALLET_TYPES.TREZOR) {
      return await signTxByTrezor(transaction, derivationPath)
    }
    // privateKey signer
    return signTxByPrivateKey(transaction, privateKey)
  }

  async signMessage(message, { privateKey, derivationPath }) {
    // add global ledger app to avoid ledger reconnect error
    if (this.type === WALLET_TYPES.LEDGER) {
      if (!global[`ledger_${this.net}`]) {
        const transport = (await WebHidTransport.isSupported())
          ? await WebHidTransport.create(10000)
          : await TransportWebUSB.create(10000)
        global[`ledger_${this.net}`] = new EthApp(transport)
      }

      const result = await global[`ledger_${this.net}`].signPersonalMessage(
        derivationPath,
        Buffer.from(JSON.stringify(message)).toString('hex')
      )

      if (result['v']) {
        let v = result['v'] - 27
        v = v.toString(16)
        if (v.length < 2) {
          v = '0' + v
        }

        return result //'0x' + result['r'] + result['s'] + v;
      }
    }

    return signTypedData({
      privateKey: Buffer.from(privateKey.replace('0x', ''), 'hex'),
      data: message,
      version: 'V4',
    })
  }

  async prepareCrossNetworkTransfer(
    token,
    { toNetwork, toAddress, amount, fee, memo }
  ) {
    const { data } = await api.requests.buildBridge({
      net: token,
      address: this.address,
      // TODO: why not like in comos? why construct a token?? ask backend
      targetNet: `${toNetwork.toLowerCase()}_${token}`,
      to: toAddress,
      amount,
      fee,
      memo,
    })
    // temporary crutch due to special format
    data.transaction = data.send
    delete data.send
    return data
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
    // generate address, public and private keys
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const master = hdkey.fromMasterSeed(seed)
    const keyPair = master.derive(derivationPath)
    const ethPublic = bip32PublicToEthereumPublic(
      Buffer.from(keyPair.publicKey)
    )
    const address = '0x' + pubToAddress(ethPublic).toString('hex')
    const privateKey = keyPair.privateKey.toString('hex')
    const publicKey = privateToPublic(Buffer.from(privateKey, 'hex')).toString(
      'hex'
    )
    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey: '0x' + privateKey,
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
    // generate address and public key
    privateKey = privateKey.replace('0x', '')
    try {
      const publicKey = privateToPublic(Buffer.from(privateKey, 'hex'))
      const address = '0x' + pubToAddress(publicKey).toString('hex')
      const publicKeyHex = publicKey.toString('hex')
      return {
        net: this.net,
        address,
        publicKey: publicKeyHex,
        privateKey: `0x${privateKey}`,
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

  static async createWalletByTrezor({ derivationPath }) {
    // prepare Trezor
    await prepareTrezorConnection()
    // generate address and public key
    const publicData = await TrezorConnect.getPublicKey({
      path: derivationPath,
      coin: 'eth',
    })
    !publicData.success &&
      errors.throwError('TrezorError', {
        message: publicData?.payload?.error,
      })
    const pub = publicData.payload.publicKey
    const buf = bip32PublicToEthereumPublic(Buffer.from(pub, 'hex'))
    const publicKey = buf.toString('hex')

    const data = await TrezorConnect.ethereumGetAddress({
      path: derivationPath,
      showOnTrezor: true,
    })
    !data.success &&
      errors.throwError('TrezorError', {
        message: data?.payload?.error,
      })
    const { address } = data.payload

    return {
      net: this.net,
      address: address.toString().toLowerCase(),
      publicKey,
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.TREZOR,
      // update network info
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

  static formatAddress(address) {
    return address.toLowerCase()
  }

  static decodePrivateKeyByPassword(encodedPrivateKey, password) {
    return `0x${super.decodePrivateKeyByPassword(encodedPrivateKey, password)}`
  }

  static encodePrivateKeyByPassword(privateKey, password) {
    // do not change format for backwards compatibility
    privateKey = privateKey.replace('0x', '')

    return super.encodePrivateKeyByPassword(privateKey, password)
  }
}
