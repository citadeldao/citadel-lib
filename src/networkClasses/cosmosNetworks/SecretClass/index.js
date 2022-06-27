import { BaseCosmosNetwork } from '../_BaseCosmosClass'
import instanceMethods from './instanceMethods'
import crypto from 'crypto'
import snip20Manager from './snip20Manager'
export class SecretNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
    this.privateKeyHash = walletInfo.privateKeyHash
    this.savedViewingKeys = walletInfo.savedViewingKeys || {}
  }

  static getSnip20Manager() {
    return snip20Manager
  }

  static async createWalletByPrivateKey(options) {
    const wallet = await super.createWalletByPrivateKey(options)
    // add privateKeyHash for simple vviewing key
    wallet.privateKeyHash = crypto
      .createHash('sha256')
      .update(wallet.privateKey)
      .digest('hex')
    return wallet
  }

  static async createWalletByMnemonic(options) {
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
