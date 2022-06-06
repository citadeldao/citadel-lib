import api from '../../api'
import walletsManager from '../../walletsManager'
import networkClasses from '../../networkClasses'
import { calculateSubtokenBalanceUSD } from '../../networkClasses/_functions/balances'
import BigNumber from 'bignumber.js'
import { CACHE_NAMES } from '../../constants'
import state from '../../state'

export const addressBalanceUpdatedСlient = async ({
  address,
  net,
  balance,
}) => {
  const isNativeToken = state
    .getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS)
    .includes(net)
  const nativeNet = networkClasses.getNativeNet(net)
  const networkClass = networkClasses.getNetworkClass(nativeNet)

  // Tformat balance object
  balance.claimableRewards = balance?.rewards
  delete balance.rewards
  // get storage wallet
  const wallet = walletsManager.getWalletInfoByAddress(nativeNet, address)

  // Если кошелька еще нет в либе, но сокеты приходят (с другой вкладки добавлен)
  if (!wallet) {
    return
  }

  // for native update its balance only and return
  if (isNativeToken) {
    // calcBalance
    balance.calculatedBalance = networkClasses
      .getNetworkClass(nativeNet)
      .calculateBalance(balance)
    // update native balance
    walletsManager.updateWallet({
      walletId: wallet.id,
      newWalletInfo: { balance },
      // deep merge for save not changed details
      method: 'deep-merge',
    })
    return {}
  }

  // for subtoken update wallet subtokenList

  // get old token item from subtokenList
  let oldTokenItem = wallet.subtokensList.find(
    ({ net: token }) => net === token
  )

  // remove subtokenList item if new balance is 0 (except xct token) and return
  if (oldTokenItem && balance.mainBalance === 0 && net !== 'bsc_xct') {
    // get item index
    const itemIndex = wallet.subtokensList.findIndex(
      ({ net: token }) => net === token
    )
    // cut it
    wallet.subtokensList.splice(itemIndex, 1)

    // update storage wallet (and wallet instance)
    walletsManager.updateWallet({
      walletId: wallet.id,
      newWalletInfo: {
        subtokensList: wallet.subtokensList,
        subtokenBalanceUSD: calculateSubtokenBalanceUSD(wallet.subtokensList),
      },
    })

    return {}
  }

  // if no old token item - create new item in subtokenList
  if (!oldTokenItem) {
    // get token price
    let price = { USD: 0, BTC: 0 }
    try {
      const { data = { USD: 0, BTC: 0 } } = await api.requests.getCurrency({
        net,
      })
      price = data
    } catch (e) {
      console.error(e)
    }
    // creat new token item with standard fields
    oldTokenItem = {
      code: networkClass.tokens[net].code,
      name: networkClass.tokens[net].name,
      net: networkClass.tokens[net].net,
      tokenBalance: {
        mainBalance: 0,
        calculatedBalance: 0,
        price,
        adding: [],
        delegatedBalance: 0,
        frozenBalance: 0,
        originatedAddresses: [],
        stake: 0,
        unstake: 0,
        linked: true,
        claimableRewards: 0,
      },
    }

    // push it to subtokenList
    wallet.subtokensList.push(oldTokenItem)
  }

  // merge new balance for save standard keys
  oldTokenItem.tokenBalance = { ...oldTokenItem.tokenBalance, ...balance }

  // calc token balance
  if (net === 'bsc_xct') {
    // for xct calc stake
    const { mainBalance = 0, stake = 0, frozenBalance = 0 } = balance
    oldTokenItem.tokenBalance.calculatedBalance = BigNumber(mainBalance)
      .plus(stake)
      .plus(frozenBalance)
      .toNumber()
  } else {
    oldTokenItem.tokenBalance.calculatedBalance =
      networkClass.calculateBalance(balance)
  }
  // update subtokensList
  walletsManager.updateWallet({
    walletId: wallet.id,
    newWalletInfo: {
      subtokensList: wallet.subtokensList,
      subtokenBalanceUSD: calculateSubtokenBalanceUSD(wallet.subtokensList),
    },
  })

  return {}
}
