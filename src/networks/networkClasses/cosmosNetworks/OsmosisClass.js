import BaseCosmosNetwork from './_BaseCosmosClass'

export default class OsmosisNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'osmo')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'osmo')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'osmo')
  }
}
