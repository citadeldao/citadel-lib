import { BaseEthNetwork } from './_BaseEthClass'

export class EvmosethNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://evmos.openscan.ai/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://evmos.openscan.ai/tx/${hash}`
  }

}