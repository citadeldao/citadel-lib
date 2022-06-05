import BaseCosmosNetwork from './_BaseCosmosClass'

export default class KonstellationNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'darc')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'darc')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'darc')
  }
}