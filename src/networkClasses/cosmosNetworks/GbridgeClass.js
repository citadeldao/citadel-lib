import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class GbridgeNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special explorer key
  getScannerLinkById() {
    return super.getScannerLinkById('gravity-bridge')
  }

  // special explorer key
  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'gravity-bridge')
  }
}
