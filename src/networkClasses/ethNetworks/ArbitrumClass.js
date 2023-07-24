import { BaseEthNetwork } from './_BaseEthClass'

export class ArbitrumNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://arbiscan.io/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://arbiscan.io/tx/${hash}`
  }
}
