import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class MantleNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://atomscan.com/assetmantle/accounts/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://atomscan.com/assetmantle/transactions/${hash}`
  }
}
