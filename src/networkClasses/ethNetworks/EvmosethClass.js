import { BaseEthNetwork } from './_BaseEthClass'

export class EvmosethNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://atomscan.com/evmos/accounts/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://atomscan.com/evmos/transactions/${hash}`
  }
}