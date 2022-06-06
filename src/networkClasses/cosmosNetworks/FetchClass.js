import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class FetchNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special explorer key
  getScannerLinkById() {
    return super.getScannerLinkById('fetchai')
  }

  // special explorer key
  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'fetchai')
  }
}
