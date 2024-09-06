import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class QuicksilverNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://quicksilver.explorers.guru/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://quicksilver.explorers.guru/transaction/${hash}`
  }
}