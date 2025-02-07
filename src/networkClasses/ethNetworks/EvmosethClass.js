import { BaseEthNetwork } from './_BaseEthClass'

export class EvmosethNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://escan.live/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://escan.live/tx/${hash}`
  }

}