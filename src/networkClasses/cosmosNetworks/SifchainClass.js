import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class SifchainNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  // special address prefix
  static async createWalletByMnemonic(options) {
    return super.createWalletByMnemonic(options, 'sif')
  }

  // special address prefix
  static async createWalletByPrivateKey(options) {
    return super.createWalletByPrivateKey(options, 'sif')
  }

  // special address prefix
  static async createWalletByLedger(options) {
    return super.createWalletByLedger(options, 'sif')
  }
}
