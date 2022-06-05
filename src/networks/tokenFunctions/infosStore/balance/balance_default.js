import libCore from '../../../../libCore'
import storage from '../../../../storage'
import { calculateSubtokenBalanceUSD } from '../../../networkClasses/_functions/balances'
import { merge } from '../../../../helpers/merge'
import networks from '../../../../networks'
import BigNumber from 'bignumber.js'

export default async function ({ token }) {
  const { data: tokenBalance } =
    await libCore.formattedApi.getDelegationBalance({
      net: token,
      address: this.address,
    })

  // calculate subtokenBalance
  if (token === 'bsc_xct') {
    // TODO: Move to balance_xct?
    const { mainBalance = 0, stake = 0, frozenBalance = 0 } = tokenBalance

    tokenBalance.calculatedBalance = BigNumber(mainBalance)
      .plus(stake)
      .plus(frozenBalance)
      .toNumber()
  } else {
    tokenBalance.calculatedBalance = networks
      .getNetworkClass(this.net)
      .calculateBalance(tokenBalance)
  }

  // update subtokensList and subtokenBalance
  if (this.subtokensList) {
    const subtokensListItem =
      this.subtokensList.find((tokenItem) => tokenItem.net === token) || {}
    merge(subtokensListItem.tokenBalance, tokenBalance)
    this.subtokenBalanceUSD = calculateSubtokenBalanceUSD(this.subtokensList)

    // update wallet cache
    storage.wallets.updateWallet({
      walletId: this.id,
      newWalletInfo: {
        subtokensList: this.subtokensList,
        subtokenBalanceUSD: this.subtokenBalanceUSD,
      },
    })
  }

  return tokenBalance
}
