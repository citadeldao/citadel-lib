import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class NibiruNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://explorer.nibiru.fi/cataclysm-1/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://explorer.nibiru.fi/cataclysm-1/tx/${hash}`
  }
}
