import libCore from '../../../../libCore'
import networks from '../../..'
import storage from '../../../../storage'

export default async function (withCacheUpdate = true) {
  const { data } = await libCore.formattedApi.getDelegationBalance({
    net: this.net,
    address: this.address,
  })

  const balance = {
    ...data,
    // TODO: move to the backend?
    calculatedBalance: networks
      .getNetworkClass(this.net)
      .calculateBalance(data),
  }

  // update wallet cache
  withCacheUpdate &&
    storage.wallets.updateWallet({
      walletId: this.id,
      newWalletInfo: { balance },
    })

  return balance
}
