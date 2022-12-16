import { BaseCosmosNetwork } from './_BaseCosmosClass'
// import {
//   signTxByPrivateKey,
//   signTxByLedger,
// } from './_BaseCosmosClass/oldSigners'
// import { WALLET_TYPES } from '../../constants'

export class EmoneyNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // // old signers (not protobuf)
  // async signTransaction(rawTransaction, { privateKey, derivationPath }) {
  //   // get transaction object
  //   const transaction = rawTransaction.transaction || rawTransaction
  //   // ledger signer
  //   if (this.type === WALLET_TYPES.LEDGER) {
  //     return await signTxByLedger(transaction, derivationPath, this.publicKey)
  //   }
  //   // privateKey signer
  //   return await signTxByPrivateKey(transaction, privateKey)
  // }
}
