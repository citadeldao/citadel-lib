import BaseCosmosNetwork from './_BaseCosmosClass'

export default class GbridgeClass extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return super.getScannerLinkById('gravity-bridge')
  }

  getTransactionURLByHash(hash) {
    return super.getTransactionURLByHash(hash, 'gravity-bridge')
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'gravity')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'gravity')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'gravity')
  }
}
