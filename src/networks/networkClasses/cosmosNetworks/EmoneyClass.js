import BaseCosmosNetwork from './_BaseCosmosClass'
import {
  signTxByPrivateKey,
  signTxByLedger,
} from './_BaseCosmosClass/oldSigners'
import { WALLET_TYPES } from '../../../constants'

export default class EmoneyNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // old signers
  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // TODO: Удалить rawTransaction.transaction.transaction после фикса бэка
    const transaction =
      rawTransaction.transaction.transaction ||
      rawTransaction.transaction ||
      rawTransaction
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath, this.publicKey)
    }
    // old signer without publicKey
    return signTxByPrivateKey(transaction, privateKey)
  }
}
