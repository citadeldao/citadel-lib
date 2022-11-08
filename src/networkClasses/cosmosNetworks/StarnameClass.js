import { BaseCosmosNetwork } from './_BaseCosmosClass'
import {
  signTxByPrivateKey,
  signTxByLedger_2,
} from './_BaseCosmosClass/oldSigners'

import { createMessageSignatureByLedger_2 } from './_BaseCosmosClass/signers'
import { WALLET_TYPES } from '../../constants'

export class StarnameNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // old (not protobuf) signers
  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // alternative ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return signTxByLedger_2(transaction, derivationPath, this.publicKey)
    }
    // privateKey signer
    return signTxByPrivateKey(transaction, privateKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    // alternative ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return createMessageSignatureByLedger_2(data, derivationPath)
    }
    // privateKey signer
    return super.createMessageSignature(data, { privateKey })
  }
  
  static async createWalletByLedger(options) {
    // alternative wallet factory
    return super.createWalletByLedger_2(options)
  }
}
