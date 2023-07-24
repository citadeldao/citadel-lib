import walletsManager from '../../../walletsManager'
import networkClasses from '../../'
import api from '../../../api'
import { retryRequestOnError } from '../../../helpers/retryRequestOnError'
import { calculateSubtokenBalanceUSD } from '../../_functions/balances'
import { OUR_TOKEN } from './../../../constants'
// import { debugConsole } from '../../../helpers/debugConsole'
// import { additionalConfig } from './../../../api/formattedRequestsAdapter/_hardCode'

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
    // Object.entries(allTokenBalances || {})
      // filter unsupported tokens
      // .filter(([token]) => networkClass.tokens[token])
      allTokenBalances.map(async ({token, meta , balance, details, methods = {bridge: []}, price = { USD: 0, BTC: 0 } }) => {
        // const addConfig = additionalConfig.find(item => item.net === this.net)?.config?.tokens?.[token] || {}
        // create subtkenList item from token config and token balance
        const subtokenListItem = {
          net: `${this.net}_${token}`,
          name: meta.name,//networkClass.tokens[token].name,
          code: meta.code,//networkClass.tokens[token].code,
          standard: meta.standard,//networkClass.tokens[token].standard,
          decimals: meta.decimal,
          nativeNet: this.net,
          methods,
          // ...addConfig,
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
            claimableRewards: 0,
          },
        }

        // // if token has stake, get detailed balance
        // if (this.getTokenActions(token).includes('stake')) {
        //   // catch error to to keep looping anyway
        //   try {
        //     const detailedBalance = await this.callTokenInfo(token, 'balance', {
        //       preventEvent: true,
        //     })
        //     subtokenListItem.tokenBalance = {
        //       ...subtokenListItem.tokenBalance,
        //       ...detailedBalance,
        //     }
        //   } catch (error) {
        //     debugConsole.error(error)
        //   }
        // }

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
