import { BaseEthNetwork } from './_BaseEthClass'

export class AvalancheNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://snowtrace.io/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://snowtrace.io/tx/${hash}`
  }
}
