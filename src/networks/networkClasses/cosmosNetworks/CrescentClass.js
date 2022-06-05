import BaseCosmosNetwork from './_BaseCosmosClass'

export default class CrescentNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'cre')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'cre')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'cre')
  }
}