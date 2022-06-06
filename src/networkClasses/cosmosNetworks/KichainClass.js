import { BaseCosmosNetwork } from './_BaseCosmosClass'
import {
  signTxByPrivateKey,
  signTxByLedger_2,
} from './_BaseCosmosClass/oldSigners'

import { createMessageSignatureByLedger_2 } from './_BaseCosmosClass/signers'
import { WALLET_TYPES } from '../../constants'

export class KichainNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // alternative ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return signTxByLedger_2(transaction, derivationPath, this.publicKey)
    }
    // not protobuf privateKey signer
    return signTxByPrivateKey(transaction, privateKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    // alternative ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return createMessageSignatureByLedger_2(data, derivationPath)
    }
    // parents privateKey signer
    return super.createMessageSignature(data, { privateKey })
  }

  // special explorer key
  getScannerLinkById() {
    return super.getScannerLinkById('ki-chain')
  }

  // special explorer key
  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'ki-chain')
  }

  // special address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'ki')
  }

  // special address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'ki')
  }

  // special address prefix
  static async createWalletByLedger(options) {
    // alternative wallet factory
    return super.createWalletByLedger_2(options, 'ki')
  }
}
