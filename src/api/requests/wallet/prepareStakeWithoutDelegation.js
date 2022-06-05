export const prepareStakeWithoutDelegation = ({
    net,
    address,
    amount,
  }) => {
    return {
      url: `transactions/${net}/${address}/simple-staked`,
      method: 'get',
      data: {
        params: {
          amount,
        },
      },
    }
  }
  