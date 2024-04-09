import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class KujiraNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://atomscan.com/kujira/accounts/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://atomscan.com/kujira/transactions/${hash}`
  }
}
