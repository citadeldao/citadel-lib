import { BaseCosmoEtheriumNetwork } from './_BaseCosmoEtheriumClass'

export class InjectiveNetwork extends BaseCosmoEtheriumNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }
  // pass your own address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'inj')
  }

  // pass your own address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'inj')
  }

  // pass your own address prefix
  static async createWalletByLedger(options) {
    console.log(77,);
    return super.createWalletByLedger(options, 'inj')
  }
}
