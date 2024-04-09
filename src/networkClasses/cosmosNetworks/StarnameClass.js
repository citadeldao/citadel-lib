import { BaseCosmosNetwork } from './_BaseCosmosClass'
export class StarnameNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://atomscan.com/starname/accounts/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://atomscan.com/starname/transactions/${hash}`
  }
}
