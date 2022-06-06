import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class SentinelNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'sent')
  }

  // special address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'sent')
  }

  // special address prefix
  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'sent')
  }
}
