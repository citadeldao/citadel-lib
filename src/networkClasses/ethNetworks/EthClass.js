import { BaseEthNetwork } from './_BaseEthClass'

export class EthNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://etherscan.io/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://etherscan.io/tx/${hash}`
  }
}
