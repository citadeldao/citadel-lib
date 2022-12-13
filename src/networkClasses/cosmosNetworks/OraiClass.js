import { BaseCosmosNetwork } from './_BaseCosmosClass'
export class OraiNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }
  // own explorer link
  getScannerLinkById() {
    return `https://scan.orai.io/account/${this.address}`
  }

  // own explorer link
  getTransactionURLByHash(hash) {
    return `https://scan.orai.io/txs/${hash}`
  }
}