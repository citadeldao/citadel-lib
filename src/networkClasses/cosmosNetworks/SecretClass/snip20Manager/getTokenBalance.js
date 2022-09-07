import { queryContract } from './queryContract'

export async function getTokenBalance(
  address,
  contractAddress,
  decimals,
  viewingKey
) {
  try {
    const resp = await queryContract({
      contractAddress,
      query: {
        balance: {
          address,
          key: viewingKey,
        },
      },
      address
    })

    if (resp.balance && resp.balance.amount)
      return {
        error: false,
        amount: resp.balance.amount / 10 ** decimals,
      }

    throw new Error(resp?.viewing_key_error?.msg || 'Unknow VK Error')
  } catch (err) {
    return { error: err, amount: null }
  }
}
