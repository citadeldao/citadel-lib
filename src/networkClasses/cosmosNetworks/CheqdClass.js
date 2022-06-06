import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class CheqdNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // own explorer link
  getScannerLinkById() {
    return `https://explorer.cheqd.io/accounts/${this.address}`
  }

  // own explorer link
  getTransactionURLByHash(hash) {
    return `https://explorer.cheqd.io/transactions/${hash}`
  }
}
