import { BaseCosmosNetwork } from './_BaseCosmosClass'
// import { WALLET_TYPES } from '../../constants'
// import {
//   signTxByPrivateKey,
//   signTxByLedger,
// } from './_BaseCosmosClass/oldSigners'

export class OraiNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // async signTransaction(rawTransaction, { privateKey, derivationPath }) {
  //   const transaction =
  //     rawTransaction.transaction ||
  //     rawTransaction
  //   if (this.type === WALLET_TYPES.LEDGER) {
  //     return await signTxByLedger(transaction, derivationPath, this.publicKey)
  //   }
  //   // old signer without publicKey
  //   return await signTxByPrivateKey(transaction, privateKey)
  // }

  // own explorer link
  getScannerLinkById() {
    return `https://scan.orai.io/account/${this.address}`
  }

  // own explorer link
  getTransactionURLByHash(hash) {
    return `https://scan.orai.io/txs/${hash}`
  }
}