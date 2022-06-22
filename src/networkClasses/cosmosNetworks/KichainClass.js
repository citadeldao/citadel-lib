import { BaseCosmosNetwork } from './_BaseCosmosClass'
import { createMessageSignatureByLedger_3, signTxByPrivateKey, signTxByLedger_2 } from './_BaseCosmosClass/signers'
import { WALLET_TYPES } from '../../constants'

export default class KichainNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

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
      return createMessageSignatureByLedger_3(data, derivationPath)
    }
    return super.createMessageSignature(data, { privateKey })
  }

  getScannerLinkById() {
    return super.getScannerLinkById('ki-chain')
  }

  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'ki-chain')
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'ki')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'ki')
  }

  static async createWalletByLedger(options) {
    // alternative wallet factory
    return super.createWalletByLedger_2(options, 'ki')
  }
}
