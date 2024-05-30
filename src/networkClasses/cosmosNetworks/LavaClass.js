import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class LavaNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://lava-explorer.w3coins.io/Lava/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://lava-explorer.w3coins.io/Lava/tx/${hash}`
  }
}
