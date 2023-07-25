import state from '../../../state'
import { hashMnemonic } from '../../../helpers/hashMnemonic'
import { BaseNetwork } from '../../_BaseNetworkClass'
import api from '../../../api'
import { signTxByLedger, signTxByTrezor, signTxByPrivateKey } from './signers'
import { WALLET_TYPES, CACHE_NAMES } from '../../../constants'
import errors from '../../../errors'
import { prepareTrezorConnection } from '../../_functions/trezor'
import { bip32PublicToEthereumPublic } from '../../_functions/crypto'
import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./functions"
import storage from '../../../storage'

export class BaseEthNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, transportType }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // alternative ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return await signTxByLedger(transaction, derivationPath, this.net, rightApp, transportType)
    }
    // trezor signer
    if (this.type === WALLET_TYPES.TREZOR) {
      return await signTxByTrezor(transaction, derivationPath)
    }
    // privateKey signer
    return signTxByPrivateKey(transaction, privateKey)
  }

  async signMessage(message, { privateKey, derivationPath, transportType }) {
    // dynamic import of large module (for fast init)
    const { default: EthApp } = await import('@ledgerhq/hw-app-eth')

    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      // add global ledger app to avoid ledger reconnect error
      let transport = null
      if (!global[`ledger_${this.net}`]) {
        transport = await getLedgerTransport(transportType)
        global[`ledger_${this.net}`] = new EthApp(transport)
      }

      let result
      try {
        if (Object.prototype.hasOwnProperty.call(message, "domainHash")) {
          // v3-v4
          result = await global[`ledger_${this.net}`].signEIP712HashedMessage(
            derivationPath,
            message.domainHash,
            message.messageHash,
          
          )
        } else {
          // personal, v1
          const formatedMessage = typeof message === 'string' ? message : Buffer.from(JSON.stringify(message)).toString('hex')
          result = await global[`ledger_${this.net}`].signPersonalMessage(
              derivationPath,
              formatedMessage
          )
        }
      } catch (error) {
        ledgerErrorHandler({ error, rightApp })
      }finally{
        if(transportType === 'usb'){
          if(global[`ledger_${this.net}`]) global[`ledger_${this.net}`] = null
          if(transport) await transport.close()
        }
      }

      

      if (result['v']) {
        let v = result['v'] - 27
        v = v.toString(16)
        if (v.length < 2) {
          v = '0' + v
        }

        return result //'0x' + result['r'] + result['s'] + v;
      }
    }

    // dynamic import of large module (for fast init)
    const { signTypedData } = await import('@metamask/eth-sig-util')
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
    oneSeed = true,
  }) {
    // dynamic import of large module (for fast init)
    const { mnemonicToSeed } = await import('bip39')
    // generate address, public and private keys
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const { default: hdkey } = await import('hdkey')
    const master = hdkey.fromMasterSeed(seed)
    const keyPair = master.derive(derivationPath)
    const ethPublic = await bip32PublicToEthereumPublic(
      Buffer.from(keyPair.publicKey)
    )
    // dynamic import of large module (for fast init)
    const { pubToAddress } = await import('ethereumjs-util')
    const address = '0x' + pubToAddress(ethPublic).toString('hex')
    const privateKey = keyPair.privateKey.toString('hex')
    // dynamic import of large module (for fast init)
    const { privateToPublic } = await import('ethereumjs-util')
    const publicKey = privateToPublic(Buffer.from(privateKey, 'hex')).toString(
      'hex'
    )
    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey: '0x' + privateKey,
      type: oneSeed ? WALLET_TYPES.ONE_SEED : WALLET_TYPES.SEED_PHRASE,
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
      // dynamic import of large module (for fast init)
      const { privateToPublic } = await import('ethereumjs-util')
      const publicKey = privateToPublic(Buffer.from(privateKey, 'hex'))
      // dynamic import of large module (for fast init)
      const { pubToAddress } = await import('ethereumjs-util')
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
    // dynamic import of large module (for fast init)
    const { default: TrezorConnect } = await import('trezor-connect')
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

  static async createWalletByLedger({ derivationPath, transportType }) {
    // dynamic import of large module (for fast init)
    const { default: EthApp } = await import('@ledgerhq/hw-app-eth')
    // add global ledger app to avoid ledger reconnect error
    let transport = null
    if (!global.ledger_eth && !global.ledger_bsc) {
      transport = await getLedgerTransport(transportType)
      global.ledger_eth = new EthApp(transport)
    }
    // generate address and public key
    let res
    try{
      res = await (
        global.ledger_eth || global.ledger_bsc
      ).getAddress(derivationPath)
    }catch(error){
      ledgerErrorHandler({ error, rightApp: this.ledger})
    }finally{
      if(transportType === 'usb'){
        if(global.ledger_eth) global.ledger_eth = null
        if(global.ledger_bsc) global.ledger_bsc = null
        if(transport) await transport.close()
      }
    }
    
    return {
      net: this.net,
      address: res.address.toString().toLowerCase(),
      publicKey: res.publicKey,
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

  static formatAddress(address) {
    return address.toLowerCase()
  }

  static async decodePrivateKeyByPassword(encodedPrivateKey, password) {
    return `0x${await super.decodePrivateKeyByPassword(
      encodedPrivateKey,
      password
    )}`
  }

  static async encodePrivateKeyByPassword(privateKey, password) {
    // do not change format for backwards compatibility
    privateKey = privateKey.replace('0x', '')

    return await super.encodePrivateKeyByPassword(privateKey, password)
  }
}
