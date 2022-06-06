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

  // special address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'gravity')
  }

  // special address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'gravity')
  }

  // special address prefix
  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'gravity')
  }
}
