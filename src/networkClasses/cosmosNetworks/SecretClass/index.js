import { BaseCosmosNetwork } from '../_BaseCosmosClass'
import instanceMethods from './instanceMethods'

export class SecretNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
    this.privateKeyHash = walletInfo.privateKeyHash
    this.savedViewingKeys = walletInfo.savedViewingKeys || {}
  }

  static async getSnip20Manager() {
    // dynamic import module with huge npm package
    const { default: snip20Manager } = await import('./snip20Manager')
    return snip20Manager
  }

  static async createWalletByPrivateKey(options) {
    // dynamic import of large module (for fast init)
    const { default: crypto } = await import('crypto')
    const wallet = await super.createWalletByPrivateKey(options)
    // add privateKeyHash for simple vviewing key
    wallet.privateKeyHash = crypto
      .createHash('sha256')
      .update(wallet.privateKey)
      .digest('hex')
    return wallet
  }

  static async createWalletByMnemonic(options) {
    // dynamic import of large module (for fast init)
    const { default: crypto } = await import('crypto')
    // add privateKeyHash for simple vviewing key
    const wallet = await super.createWalletByMnemonic(options)
    wallet.privateKeyHash = crypto
      .createHash('sha256')
      .update(wallet.privateKey)
      .digest('hex')
    return wallet
  }
}

// add wallet methods
Object.assign(SecretNetwork.prototype, instanceMethods)
