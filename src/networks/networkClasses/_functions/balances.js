import BigNumber from 'bignumber.js'

export const calculateSubtokenBalanceUSD = (subtokensList) => {
  const subtokenBalanceUSD = subtokensList.reduce(
    (
      total,
      {
        tokenBalance: {
          calculatedBalance = 0,
          price: { USD },
        },
      }
    ) =>
      BigNumber(total).plus(BigNumber(calculatedBalance).times(USD)).toNumber(),
    0
  )

  return subtokenBalanceUSD
}
