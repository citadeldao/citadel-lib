import { BaseCosmosNetwork } from './_BaseCosmosClass'
// import {
//   createMessageSignatureByLedger_2,
//   signTxByPrivateKey,
//   signTxByLedger_2,
// } from './_BaseCosmosClass/signers'
// import { WALLET_TYPES } from '../../constants'

export class KichainNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // async signTransaction(rawTransaction, { privateKey, derivationPath }) {
  //   const transaction = rawTransaction.transaction || rawTransaction
  //   // alternative method for ledger
  //   if (this.type === WALLET_TYPES.LEDGER) {
  //     return signTxByLedger_2(transaction, derivationPath, this.publicKey)
  //   }
  //   // old signer without publicKey
  //   return await signTxByPrivateKey(transaction, privateKey, this.publicKey)
  // }

  // async createMessageSignature(data, { privateKey, derivationPath }) {
  //   // alternative method for ledger
  //   if (this.type === WALLET_TYPES.LEDGER) {
  //     return createMessageSignatureByLedger_2(data, derivationPath, true)
  //   }
  //   return super.createMessageSignature(data, { privateKey })
  // }

  getScannerLinkById() {
    return super.getScannerLinkById('ki-chain')
  }

  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'ki-chain')
  }
}
