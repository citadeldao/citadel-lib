import { BaseEthNetwork } from './_BaseEthClass'

export class OptimismNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://optimistic.etherscan.io/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://optimistic.etherscan.io/tx/${hash}`
  }
}
