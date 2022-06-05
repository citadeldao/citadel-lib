import BaseCosmoEtheriumClass from './_BaseCosmoEtheriumClass'

export default class EvmosNetwork extends BaseCosmoEtheriumClass {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'evmos')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'evmos')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'evmos')
  }
}
