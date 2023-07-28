import walletsManager from '../../../walletsManager'
import networkClasses from '../../'
import api from '../../../api'
import { retryRequestOnError } from '../../../helpers/retryRequestOnError'
import { calculateSubtokenBalanceUSD } from '../../_functions/balances'
import { OUR_TOKEN } from './../../../constants'

// private method
export const updateSubtokensList = async function (
  tokensToAddAfterUpdate = []
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  // return empty object if net does not have tokens
  if (!networkClass.totalTokens) {
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
      allTokenBalances.map(async ({token, meta , balance, details, methods = {bridge: []}, price = { USD: 0, BTC: 0 } }) => {
        // create subtkenList item from token config and token balance
        const subtokenListItem = {
          net: `${this.net}_${token}`,
          name: meta.name,
          code: meta.code,
          standard: meta.standard,
          decimals: meta.decimal,
          nativeNet: this.net,
          methods,
          // by default - get balance from allTokenBalances array
          hasTransactionComment: meta.standard !== 'snip20',
          tokenBalance: {
            mainBalance: details.available,
            calculatedBalance: balance,
            price,
            adding: [],
            delegatedBalance: 0,
            frozenBalance: details.frozen,
            originatedAddresses: [],
            stake: details.stake,
            unstake: 0,
            linked: true,
            claimableRewards: details.rewards || 0
          },
        }
        return subtokenListItem
      })
  )

  // filter out tokens with a zero balance (the exception is bsc_xct, it is always in the list). Add additional tokens
  const resultSubtokensList = [
    ...tokensToAddAfterUpdate,
    ...subtokensList.filter(
      ({ tokenBalance, net }) =>
        tokenBalance.calculatedBalance !== 0 || net === OUR_TOKEN
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
