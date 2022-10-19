import { BaseNetwork } from '../_BaseNetworkClass'
import { mnemonicToSeed } from 'bip39'
import { bip32 } from 'bitcoinjs-lib'
import TronWeb from 'tronweb'
import Trx from '@ledgerhq/hw-app-trx'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { getPubKeyFromPriKey, hexStr2byteArray } from './signers/functions'
import { WALLET_TYPES } from '../../constants'
import { signTxByPrivateKey, signTxByLedger } from './signers'

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
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const node = await bip32.fromSeed(seed)
    const child = await node.derivePath(derivationPath)
    const privateKey = await child.privateKey.toString('hex')
    const publicKey = Buffer.from(
      getPubKeyFromPriKey(hexStr2byteArray(privateKey))
    ).toString('hex')
    const address = await TronWeb.address.fromPrivateKey(privateKey)

    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey,
      type: oneSeed ? WALLET_TYPES.ONE_SEED : WALLET_TYPES.GENERATED_FROM_SEED,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    const address = await TronWeb.address.fromPrivateKey(privateKey)
    const publicKey = Buffer.from(
      getPubKeyFromPriKey(hexStr2byteArray(privateKey))
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
    const transport = (await WebHidTransport.isSupported())
      ? await WebHidTransport.create(10000)
      : await TransportWebUSB.create(10000)

    const tronApp = new Trx(transport)
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
