// function returns request parameters for the axios instance.
export const prepareStakeWithoutDelegation = ({ net, address, amount }) => {
  return {
    // backend domain is in the axios instance
    url: `transactions/${net}/${address}/simple-staked`,
    method: 'get',
    data: {
      params: {
        amount,
        version: '1.1.0',
      },
    },
  }
}
