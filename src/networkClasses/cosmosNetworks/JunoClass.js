import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class JunoNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://atomscan.com/juno/accounts/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://atomscan.com/juno/transactions/${hash}`
  }
}
