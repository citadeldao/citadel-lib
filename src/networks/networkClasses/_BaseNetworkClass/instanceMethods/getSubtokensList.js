import api from '../../../../api'
import { calculateSubtokenBalanceUSD } from '../../_functions/balances'
import retryRequestOnError from '../../../../helpers/retryRequestOnError.js'
import networks from '../../..'

export default async function () {
  const networkClass = networks.getNetworkClass(this.net)

  // return if net does not have tokens
  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length)
    return {}

  const { data } = await retryRequestOnError(
    () =>
      api.requests.getAllTokenBalances({
        net: this.net,
        address: this.address,
      }),
    {
      retryDelay: 2000,
      retryCount: 1,
      retryableErrorStatus: 500,
      throwError: false,
    }
  )

  const subtokensList = await Promise.all(
    Object.entries(data || {})
      // filter unsupported tokens
      .filter(([token]) => networkClass.tokens[token])
      .map(async ([token, { amount, price = { USD: 0, BTC: 0 } }]) => {
        let tokenBalance = null
        const hasStake = this.getTokenActions(token).includes('stake')

        if (hasStake) {
          // call token info (delegation balance request)
          let tokenInfoResponse = {}
          try {
            tokenInfoResponse = await this.callTokenInfo(token, 'balance')
          } catch (error) {
            console.error(error)
          }

          const {
            mainBalance = 0,
            calculatedBalance,
            adding = [],
            delegatedBalance = 0,
            frozenBalance = 0,
            originatedAddresses = [],
            stake = 0,
            unstake = 0,
            claimableRewards = 0,
          } = tokenInfoResponse

          tokenBalance = {
            mainBalance,
            calculatedBalance,
            price,
            adding,
            delegatedBalance,
            frozenBalance,
            originatedAddresses,
            claimableRewards,
            stake,
            unstake,
            linked: true,
          }
        } else {
          // get balance from tokens request
          tokenBalance = {
            mainBalance: amount,
            calculatedBalance: amount,
            price,
            adding: [],
            delegatedBalance: 0,
            frozenBalance: 0,
            originatedAddresses: [],
            stake: 0,
            unstake: 0,
            linked: true,
            claimableRewards: 0,
          }
        }

        return {
          net: token,
          name: networkClass.tokens[token].name,
          code: networkClass.tokens[token].code,
          standard: networkClass.tokens[token].standard,
          tokenBalance,
        }
      })
  )

  return {
    subtokensList: subtokensList.filter(
      ({ tokenBalance, net }) =>
        tokenBalance.calculatedBalance !== 0 || net === 'bsc_xct'
    ),
    subtokenBalanceUSD: calculateSubtokenBalanceUSD(subtokensList),
  }
}
