import BaseCosmosNetwork from './_BaseCosmosClass'

export default class StargazeNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'stars')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'stars')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'stars')
  }
}
