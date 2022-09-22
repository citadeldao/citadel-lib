import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class StafiNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // own explorer link
  getScannerLinkById() {
    return `https://ping.pub/stafihub/account/${this.address}`
  }

  // own explorer link
  getTransactionURLByHash(hash) {
    return `https://ping.pub/stafihub/tx/${hash}`
  }
}