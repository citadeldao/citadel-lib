import { BaseCosmosNetwork } from './_BaseCosmosClass'

export class JackalNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

    // own explorer link
    getScannerLinkById() {
        return `https://explorer.nodestake.top/jackal/account/${this.address}`
    }
    
    // own explorer link
    getTransactionURLByHash(hash) {
        return `https://explorer.nodestake.top/jackal/tx/${hash}`
    }
}