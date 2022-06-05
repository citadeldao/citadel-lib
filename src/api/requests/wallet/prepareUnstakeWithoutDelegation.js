export const prepareUnstakeWithoutDelegation = ({
    net,
    address,
    amount,
  }) => {
    return {
      url: `/transactions/${net}/${address}/free-staked`,
      method: 'get',
      data: {
        params: {
          unstake: amount,
        },
      },
    }
  }