import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class NolusNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // own explorer link
  getScannerLinkById() {
    return `https://nolus.explorers.guru/account/${this.address}`
  }

  // own explorer link
  getTransactionURLByHash(hash) {
    return `https://nolus.explorers.guru/transaction/${hash}`
  }
}