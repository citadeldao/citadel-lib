import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class MantleNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special explorer key
  getScannerLinkById() {
    return super.getScannerLinkById('asset-mantle')
  }

  // special explorer key
  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'asset-mantle')
  }
}
