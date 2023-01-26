import { BaseNetwork } from '../_BaseNetworkClass'
import Trx from '@ledgerhq/hw-app-trx'
import { getPubKeyFromPriKey, hexStr2byteArray } from './signers/functions'
import { WALLET_TYPES } from '../../constants'
import { signTxByPrivateKey, signTxByLedger } from './signers'
import {getLedgerTransport} from "../../ledgerTransportProvider";

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

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction = rawTransaction.transaction || rawTransaction
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath, this.publicKey)
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

  static async createWalletByLedger({ derivationPath }) {
    const transport = await getLedgerTransport()

    const tronApp = new Trx(transport)
    console.log('test111', tronApp);
    // console.log('test22', await tronApp.getAppConfiguration());
    const { publicKey, address } = await tronApp.getAddress(derivationPath)

    await transport.close()
    return {
      net: this.net,
      address,
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
}
