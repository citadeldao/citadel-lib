import BaseCosmoEtheriumClass from './_BaseCosmoEtheriumClass'

export default class EvmosNetwork extends BaseCosmoEtheriumClass {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'inj')
  }

  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'inj')
  }

  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'inj')
  }
}
