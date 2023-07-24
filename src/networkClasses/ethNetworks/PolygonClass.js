import { BaseEthNetwork } from './_BaseEthClass'

export class PolygonNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://polygonscan.com/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://polygonscan.com/tx/${hash}`
  }
}
