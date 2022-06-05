import api from '../../../../../api'
// import { getSubtokensList as superGetSubtokensList } from '../../../_BaseNetworkClass/instanceMethods/getSubtokensList'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import { WALLET_TYPES } from '../../../../../constants'
import networks from '../../../..'

export async function getSnip20SubtokensList(
  // TODO: refact and remove "tokensForUpdate" obj argument. Split the updateSubtokensList and updateSnip20SubtokensList function
  tokensForUpdate
) {
  const networkClass = networks.getNetworkClass(this.net)
  // after ics20 added, set snip20
  if (this.type === WALLET_TYPES.PUBLIC_KEY)
    return {
      subtokensList: [],
      subtokenBalanceUSD: 0,
    }

  // for SNIP-20 only. For ICS-20 use super
  const subtokensList = []
  // do not use Promise.all because 429 cosmWasm error (too many requests)
  for (const token in this.savedViewingKeys) {
    if (!tokensForUpdate) {
      tokensForUpdate = Object.keys(networkClass.tokens)
    }
    if (!tokensForUpdate.includes(token)) {
      // push oldValue
      const oldTokenItem = this.subtokensList.find(({ net }) => net === token)
      subtokensList.push(oldTokenItem)
      continue
    }

    let balance
    try {
      balance = await this.callTokenInfo(token, 'balance')
    } catch (error) {
      // if VK is not valid
      // if (error instanceof errors.getErrorClass('ViewingKeyError')) return
      // throw error
      // catch errors for init library
      console.warn(error)
      // continue if balance error
      continue
    }
    const { calculatedBalance, mainBalance } = balance

    let price = { USD: 0, BTC: 0 }
    try {
      const { data = { USD: 0, BTC: 0 } } = await api.requests.getCurrency({
        net: token,
      })
      price = data
    } catch (e) {
      console.error(e)
    }

    subtokensList.push({
      net: networkClass.tokens[token].net,
      name: networkClass.tokens[token].name,
      code: networkClass.tokens[token].code,
      standard: networkClass.tokens[token].standard,
      savedViewingKey: this.savedViewingKeys[token],
      tokenBalance: {
        mainBalance,
        calculatedBalance,
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
    })
  }
  return {
    subtokensList,
    subtokenBalanceUSD: calculateSubtokenBalanceUSD(subtokensList),
  }
}
