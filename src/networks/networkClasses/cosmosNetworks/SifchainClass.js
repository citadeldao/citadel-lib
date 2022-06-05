import BaseCosmosNetwork from './_BaseCosmosClass'

export default class SifchainNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'sif')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'sif')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'sif')
  }
}
