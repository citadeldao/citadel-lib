import walletsManager from '../../walletsManager'
import networkClasses from '../../networkClasses'
import walletInstances from '../../walletInstances'
import { isNativeToken } from '../../helpers/isNativeToken'

export const addressBalanceUpdatedСlient = async ({
  address,
  net,
  balance,
  tokenReloadRequired,
}) => {
  // check that the wallet exists
  const wallet = walletsManager.getWalletInfoByAddress(
    networkClasses.getNativeNet(net),
    address
  )
  if (!wallet) {
    return
  }

  // update balance from socket data for native net
  if (isNativeToken(net)) {
    // format balance object (rename rewards)
    balance.claimableRewards = balance?.rewards
    delete balance.rewards

    // calcBalance
    balance.calculatedBalance = networkClasses
      .getNetworkClass(net)
      .calculateBalance(balance)
    // update native balance
    walletsManager.updateWallet({
      walletId: wallet.id,
      newWalletInfo: { balance },
      // deep merge for save not changed details
      method: 'deep-merge',
    })
  }

  // update subtokensList if required
  if (tokenReloadRequired) {
    await walletInstances.getWalletInstanceById(wallet.id).updateSubtokensList()
  }

  return {}
}
