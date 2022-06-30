import api from '../../../api'
import walletsManager from '../../../walletsManager'

// proxy request to backend
export const getDelegationBalance = async function (withCacheUpdate = true) {
  const { data: balance } = await api.requests.getDelegationBalance({
    net: this.net,
    address: this.address,
  })

  // update wallet cache and wallet instace
  withCacheUpdate &&
    walletsManager.updateWallet({
      walletId: this.id,
      newWalletInfo: { balance },
    })

  return balance
}
