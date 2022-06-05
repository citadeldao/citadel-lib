import BaseCosmosNetwork from './_BaseCosmosClass'
import {
  signTxByPrivateKey,
  signTxByLedger_2,
} from './_BaseCosmosClass/oldSigners'

import { createMessageSignatureByLedger_2 } from './_BaseCosmosClass/signers'
import { WALLET_TYPES } from '../../../constants'

export default class StarnameNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // old signers
  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction =
      rawTransaction.transaction.transaction ||
      rawTransaction.transaction ||
      rawTransaction
    // альтернативный метод для леджера
    if (this.type === WALLET_TYPES.LEDGER) {
      return signTxByLedger_2(transaction, derivationPath, this.publicKey)
    }
    // old signer without publicKey
    return signTxByPrivateKey(transaction, privateKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    // альтернативный метод для леджера
    if (this.type === WALLET_TYPES.LEDGER) {
      return createMessageSignatureByLedger_2(data, derivationPath)
    }

    return super.createMessageSignature(data, { privateKey })
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'star')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'star')
  }

  static async createWalletByLedger(options) {
    // alternative wallet factory
    return super.createWalletByLedger_2(options, 'star')
  }
}
