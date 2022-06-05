import BaseCosmosNetwork from './_BaseCosmosClass'

export default class CheqdNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://explorer.cheqd.io/accounts/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://explorer.cheqd.io/transactions/${hash}`
  }
}
