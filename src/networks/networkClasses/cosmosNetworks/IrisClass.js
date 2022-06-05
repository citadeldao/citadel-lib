import BaseCosmosNetwork from './_BaseCosmosClass'

export default class IrisNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'iaa')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'iaa')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'iaa')
  }
}
