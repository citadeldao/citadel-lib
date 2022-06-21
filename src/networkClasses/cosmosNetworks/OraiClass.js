import BaseCosmosNetwork from './_BaseCosmosClass'

export default class OraiNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

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

  // own explorer link
  getScannerLinkById() {
    return `https://scan.orai.io/account/${this.address}`
  }

  // own explorer link
  getTransactionURLByHash(hash) {
    return `https://scan.orai.io/txs/${hash}`
  }
}