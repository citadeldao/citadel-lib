import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
import api from '../../api'
import base58check from 'bs58check'
import { WALLET_TYPES, CACHE_NAMES } from '../../constants'
import errors from '../../errors'
import { BaseNetwork } from '../_BaseNetworkClass'
import {
  signTxByPrivateKey,
  createMessageSignature,
  signTxByLedger,
  signTxByTrezor,
} from './signers'
import { TezosPrefix, walletFromPrivate } from './functions/tezosFunctions'
import { TezosOneseed } from './functions/generate'
import * as TezosUtil from './functions/utils'
import { TezApp, ledgerErrorHandler } from './ledgerApp'
import BigNumber from 'bignumber.js'
import { getType } from '../../helpers/checkArguments'
import { prepareTrezorConnection } from '../_functions/trezor'
import { debugConsole } from '../../helpers/debugConsole'
import { getLedgerTransport } from "../../ledgerTransportProvider";
import storage from '../../storage'

export class TezosNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://tzstats.com/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://tzkt.io/${hash}`
  }

  async getKTAddresses() {
    // get kt addresses with balances
    const addresses = await api.externalRequests.getKTAccounts({
      address: this.address,
    })

    // return formatted array with balances
    return addresses.map((item) => {
      const mainBalance = item.balance / 10 ** TezosNetwork.decimals
      const stake = item.delegate?.active ? mainBalance : 0
      const frozenBalance = 0
      item.balance = {
        mainBalance,
        stake,
        frozenBalance,
        calculatedBalance: TezosNetwork.calculateBalance({
          mainBalance,
          frozenBalance,
        }),
      }
      return item
    })
  }

  async prepareTransfer(options) {
    return await super.prepareTransfer({
      // with kt address
      ...options,
      publicKey: this.publicKey,
    })
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, transportType}) {
    const transaction = rawTransaction.transaction || rawTransaction
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return await signTxByLedger(transaction, derivationPath, rightApp, transportType)
    }
    if (this.type === WALLET_TYPES.TREZOR) {
      return await signTxByTrezor(transaction, derivationPath)
    }
    privateKey = TezosUtil.writeKeyWithHint(privateKey, 'edsk')
    return await signTxByPrivateKey(transaction, privateKey)
  }

  createMessageSignature(data, { privateKey, derivationPath, transportType }) {
    //rigth app for ledger
    const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

    return createMessageSignature(data, {
      privateKey,
      derivationPath,
      type: this.type,
      rightApp,
      transportType
    })
  }

  async prepareDelegation({ nodeAddresses, kt }) {
    // send difference of values
    const { data } = await api.requests.prepareDelegation({
      from: this.address,
      net: this.net,
      toAddress: nodeAddresses[0],
      amount: 0,
      publicKey: this.publicKey,
      kt,
    })

    return data
  }

  static calculateBalance({ mainBalance = 0, frozenBalance = 0 } = {}) {
    return BigNumber(mainBalance).plus(frozenBalance).toNumber()
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
    oneSeed = true,
  }) {
    // dynamic import of large module (for fast init)
    const { mnemonicToSeed } = await import('bip39')
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const keyPair = await TezosOneseed.keys(seed, passphrase, derivationPath)
    keyPair.publicExtendedKey = TezosUtil.readKeyWithHint(
      keyPair.publicKey,
      'edpk'
    )
    keyPair.privateExtendedKey = TezosUtil.readKeyWithHint(
      keyPair.privateKey,
      'edsk'
    )
    keyPair.address = TezosUtil.computeKeyHash(keyPair.publicKey, 'tz1')
    const { publicKey, address } = keyPair
    const publicKeyBuffer = Buffer.concat([
      Buffer.from(TezosPrefix.edpk),
      Buffer.from(publicKey),
    ])
    const publicKeyBase58 = base58check.encode(publicKeyBuffer)
    return {
      net: this.net,
      address,
      publicKey: publicKeyBase58,
      derivationPath,
      privateKey: TezosUtil.readKeyWithHint(keyPair.privateKey, 'edsk'),
      type: oneSeed ? WALLET_TYPES.ONE_SEED : WALLET_TYPES.SEED_PHRASE,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(mnemonic),
      }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    let keyPair
    try {
      keyPair = await walletFromPrivate(privateKey)
    } catch (error) {
      debugConsole.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
    keyPair.publicExtendedKey = TezosUtil.readKeyWithHint(
      keyPair.publicKey,
      'edpk'
    )
    keyPair.privateExtendedKey = TezosUtil.readKeyWithHint(
      keyPair.privateKey,
      'edsk'
    )
    keyPair.address = TezosUtil.computeKeyHash(keyPair.publicKey, 'tz1')

    const { publicKey, address } = keyPair
    const publicKeyBuffer = Buffer.concat([
      Buffer.from(TezosPrefix.edpk),
      Buffer.from(publicKey),
    ])
    const publicKeyBase58 = base58check.encode(publicKeyBuffer)

    return {
      net: this.net,
      address,
      publicKey: publicKeyBase58,
      privateKey,
      derivationPath: null,
      type: WALLET_TYPES.PRIVATE_KEY,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }

  static async createWalletByLedger({ derivationPath, transportType }) {
    let transport
    if (!global.ledger_tez) {
      transport = await getLedgerTransport(transportType)
      global.ledger_tez = new TezApp(transport)
    }

    let res
    try{
      res = await global.ledger_tez.getAddress( derivationPath )
    }catch(error){
      ledgerErrorHandler({ error, rightApp: this.ledger})
    }finally{
      if(transportType === 'usb'){
        if(global.ledger_tez) global.ledger_tez = null
        if(transport) await transport.close()
      }
    }
    
    return {
      net: this.net,
      address: res.address.toString(),
      publicKey: base58check.encode(res.publicKey),
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }

  static async createWalletByTrezor({ derivationPath }) {
    // dynamic import of large module (for fast init)
    const { default: TrezorConnect } = await import('trezor-connect')
    await prepareTrezorConnection()
    const publicData = await TrezorConnect.tezosGetPublicKey({
      path: derivationPath,
      coin: '',
    })
    !publicData.success &&
      errors.throwError('TrezorError', {
        message: publicData?.payload?.error,
      })
    const publicKey = publicData.payload.publicKey
    const data = await TrezorConnect.tezosGetAddress({
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
      address: address.toString(),
      publicKey,
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.TREZOR,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }

  static formatPublicKeyFromBuffer(publicKey) {
    // convert to hex string if Buffer or Object
    if (publicKey instanceof Buffer) {
      return base58check.encode(publicKey)
    }
    if (getType(publicKey) === 'Object') {
      return base58check.encode(Buffer.from(publicKey))
    }

    // do not format publicKey if not Buffer or Object
    return publicKey
  }

  static async decodePrivateKeyByPassword(encodedPrivateKey, password) {
    return TezosUtil.readKeyWithHint(
      Buffer.from(
        await super.decodePrivateKeyByPassword(encodedPrivateKey, password),
        'hex'
      ),
      'edsk'
    )
  }

  static async encodePrivateKeyByPassword(privateKey, password) {
    return await super.encodePrivateKeyByPassword(
      Buffer.from(TezosUtil.writeKeyWithHint(privateKey, 'edsk')).toString(
        'hex'
      ),
      password
    )
  }
}
