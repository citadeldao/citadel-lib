import storage from '../../../../storage'
import networks from '../../..'

export default async function () {
  const networkClass = networks.getNetworkClass(this.net)
  // return if net does not have tokens
  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length)
    return {}

  const tokenBalances = await this.getSubtokensList()

  storage.wallets.updateWallet({
    walletId: this.id,
    newWalletInfo: tokenBalances,
  })
}
