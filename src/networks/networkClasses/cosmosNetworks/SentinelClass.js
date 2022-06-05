import BaseCosmosNetwork from './_BaseCosmosClass'

export default class SentinelNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'sent')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'sent')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'sent')
  }
}
