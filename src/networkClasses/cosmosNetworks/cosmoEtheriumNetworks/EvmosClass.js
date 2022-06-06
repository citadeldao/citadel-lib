import { BaseCosmoEtheriumNetwork } from './_BaseCosmoEtheriumClass'

export class EvmosNetwork extends BaseCosmoEtheriumNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // pass your own address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'evmos')
  }

  // pass your own address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'evmos')
  }

  // pass your own address prefix
  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'evmos')
  }
}
