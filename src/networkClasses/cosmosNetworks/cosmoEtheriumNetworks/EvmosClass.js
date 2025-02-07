import { BaseCosmoEtheriumNetwork } from './_BaseCosmoEtheriumClass'

export class EvmosNetwork extends BaseCosmoEtheriumNetwork {
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
