import { BaseCosmosNetwork } from './_BaseCosmosClass'
import {
  signTxByPrivateKey,
  signTxByLedger,
} from './_BaseCosmosClass/oldSigners'
import { WALLET_TYPES, CACHE_NAMES } from '../../constants'
import storage from '../../storage'

export class EmoneyNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // old signers (not protobuf)
  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return await signTxByLedger(transaction, derivationPath, this.publicKey, null, rightApp)
    }
    // privateKey signer
    return await signTxByPrivateKey(transaction, privateKey)
  }
}
