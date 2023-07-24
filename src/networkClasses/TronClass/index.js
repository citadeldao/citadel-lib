import { BaseNetwork } from '../_BaseNetworkClass'
import Trx from '@ledgerhq/hw-app-trx'
import { getPubKeyFromPriKey, hexStr2byteArray } from './signers/functions'
import { WALLET_TYPES, CACHE_NAMES } from '../../constants'
import { signTxByPrivateKey, signTxByLedger } from './signers'
import { getLedgerTransport } from "../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./signers/functions"
import storage from '../../storage'

export class TronNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://tronscan.org/#/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://tronscan.org/#/transaction/${hash}`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, transportType }) {
    const transaction = rawTransaction.transaction || rawTransaction
    if (this.type === WALLET_TYPES.LEDGER) {
       //rigth app for ledger
       const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return await signTxByLedger(transaction, derivationPath, rightApp, transportType)
    }
    return signTxByPrivateKey(transaction, privateKey)
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
    oneSeed = true,
  }) {
    // dynamic import of large module (for fast init)
    const { default: TronWeb } = await import('tronweb')
    // dynamic import of large module (for fast init)
    const { mnemonicToSeed } = await import('bip39')

    const seed = await mnemonicToSeed(mnemonic, passphrase)
    // dynamic import of large module (for fast init)
    const { bip32 } = await import('bitcoinjs-lib')
    const node = bip32.fromSeed(seed)
    const child = node.derivePath(derivationPath)
    const privateKey = child.privateKey.toString('hex')
    const publicKey = Buffer.from(
      await getPubKeyFromPriKey(hexStr2byteArray(privateKey))
    ).toString('hex')
    const address = await TronWeb.address.fromPrivateKey(privateKey)

    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey,
      type: oneSeed ? WALLET_TYPES.ONE_SEED : WALLET_TYPES.SEED_PHRASE,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    // dynamic import of large module (for fast init)
    const { default: TronWeb } = await import('tronweb')
    const address = await TronWeb.address.fromPrivateKey(privateKey)
    const publicKey = Buffer.from(
      await getPubKeyFromPriKey(hexStr2byteArray(privateKey))
    ).toString('hex')
    return {
      net: this.net,
      address,
      publicKey,
      privateKey,
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

  static async createWalletByLedger({ derivationPath, transportType }) {
    const transport = await getLedgerTransport(transportType)
    const tronApp = new Trx(transport)
    
    let res
    try{
      res = await tronApp.getAddress(derivationPath)
    }catch(error){
      ledgerErrorHandler({ error, rightApp: this.ledger})
    }finally{
      if(transport) await transport.close()
    }
    return {
      net: this.net,
      address: res.address,
      publicKey: res.publicKey,
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
}
