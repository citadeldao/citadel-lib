import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class CoreumNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special explorer key
  getScannerLinkById() {
    return `https://explorer.coreum.com/accounts/${this.address}`
  }

  // special explorer key
  getTransactionURLByHash(hash) {
    return `https://explorer.coreum.com/transactions/${hash}`
  }
}
