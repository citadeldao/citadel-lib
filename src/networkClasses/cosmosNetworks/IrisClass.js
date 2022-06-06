import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class IrisNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'iaa')
  }

  // special address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'iaa')
  }

  // special address prefix
  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'iaa')
  }
}
