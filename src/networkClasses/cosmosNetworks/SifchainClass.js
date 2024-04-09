import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class SifchainNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://atomscan.com/sifchain/accounts/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://atomscan.com/sifchain/transactions/${hash}`
  }
}
