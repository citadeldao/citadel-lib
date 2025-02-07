
import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class TeritoriNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://ping.pub/teritori/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://ping.pub/teritori/tx/${hash}`
  }
}