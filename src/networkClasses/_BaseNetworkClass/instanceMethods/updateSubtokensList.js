import walletsManager from '../../../walletsManager'
import networkClasses from '../../'

// private method
export const updateSubtokensList = async function () {
  // return empty object if net does not have tokens
  if (
    !networkClasses.getNetworkClass(this.net).tokens ||
    !Object.keys(networkClasses.getNetworkClass(this.net).tokens).length
  ) {
    return {}
  }

  const { subtokensList, subtokenBalanceUSD } = await this.getSubtokensList()

  walletsManager.updateWallet({
    walletId: this.id,
    newWalletInfo: { subtokensList, subtokenBalanceUSD },
  })
}
