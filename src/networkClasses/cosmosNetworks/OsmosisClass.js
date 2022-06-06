import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class OsmosisNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'osmo')
  }

  // special address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'osmo')
  }

  // special address prefix
  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'osmo')
  }
}
