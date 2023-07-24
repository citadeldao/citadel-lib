import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class KichainNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return super.getScannerLinkById('ki-chain')
  }

  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'ki-chain')
  }
}
