import { BaseEthNetwork } from './_BaseEthClass'

export class BerachainNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://bartio.beratrail.io/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://bartio.beratrail.io/tx/${hash}`
  }
}
