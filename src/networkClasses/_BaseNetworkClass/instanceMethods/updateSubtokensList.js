import walletsManager from '../../../walletsManager'
import networkClasses from '../../'
import api from '../../../api'
import { retryRequestOnError } from '../../../helpers/retryRequestOnError'
import { calculateSubtokenBalanceUSD } from '../../_functions/balances'

// private method
export const updateSubtokensList = async function (
  tokensToAddAfterUpdate = []
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  // return empty object if net does not have tokens
  if (!networkClass.tokens || !Object.keys(networkClass.tokens).length) {
    return {}
  }

  // get tokens with balances
  const { data: allTokenBalances } = await retryRequestOnError(
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

  // create subtokenList
  const subtokensList = await Promise.all(
    Object.entries(allTokenBalances || {})
      // filter unsupported tokens
      .filter(([token]) => networkClass.tokens[token])
      .map(async ([token, { amount, price = { USD: 0, BTC: 0 } }]) => {
        // create subtkenList item from token config and token balance
        const subtokenListItem = {
          net: token,
          name: networkClass.tokens[token].name,
          code: networkClass.tokens[token].code,
          standard: networkClass.tokens[token].standard,
          // by default - get balance from allTokenBalances array
          tokenBalance: {
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
          },
        }

        // if token has stake, get detailed balance
        if (this.getTokenActions(token).includes('stake')) {
          // catch error to to keep looping anyway
          try {
            const detailedBalance = await this.callTokenInfo(token, 'balance')
            subtokenListItem.tokenBalance = {
              ...subtokenListItem.tokenBalance,
              ...detailedBalance,
            }
          } catch (error) {
            console.error(error)
          }
        }

        return subtokenListItem
      })
  )

  // filter out tokens with a zero balance (the exception is bsc_xct, it is always in the list). Add additional tokens
  const resultSubtokensList = [
    ...tokensToAddAfterUpdate,
    ...subtokensList.filter(
      ({ tokenBalance, net }) =>
        tokenBalance.calculatedBalance !== 0 || net === 'bsc_xct'
    ),
  ]

  walletsManager.updateWallet({
    walletId: this.id,
    newWalletInfo: {
      subtokensList: resultSubtokensList,
      subtokenBalanceUSD: calculateSubtokenBalanceUSD(resultSubtokensList),
    },
  })
}
