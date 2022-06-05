import BaseCosmosNetwork from './_BaseCosmosClass'

export default class FetchNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return super.getScannerLinkById('fetchai')
  }

  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'fetchai')
  }
}
