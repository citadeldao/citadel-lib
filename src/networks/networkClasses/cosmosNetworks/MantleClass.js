import BaseCosmosNetwork from './_BaseCosmosClass'

export default class MantleNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return super.getScannerLinkById('asset-mantle')
  }

  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'asset-mantle')
  }
}
