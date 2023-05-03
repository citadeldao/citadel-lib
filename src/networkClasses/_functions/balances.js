import BigNumber from 'bignumber.js'

export const calculateSubtokenBalanceUSD = (subtokensList) =>
  // sum up all the balances of tokens in the list and recalculate at the rate of usd
  subtokensList.reduce(
    (
      total,
      {
        tokenBalance: {
          calculatedBalance = 0,
          price: { USD },
        },
      }
    ) =>
      BigNumber(total).plus(BigNumber(calculatedBalance).times(USD || 0)).toNumber(),
    0
  )
