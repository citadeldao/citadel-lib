// function returns request parameters for the axios instance.
export const prepareUnstakeWithoutDelegation = ({
    net,
    address,
    amount,
  }) => {
    return {
      // backend domain is in the axios instance
  url: `/transactions/${net}/${address}/free-staked`,
      method: 'get',
      data: {
        params: {
          unstake: amount,
        },
      },
    }
  }