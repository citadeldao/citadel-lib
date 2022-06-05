export const polkadotPrepareUnstake = (data) => ({
  url: `/transactions/polkadot/${data.address}/prepareUnstake`,
  method: 'get',
  data: {
    params: {
      amount: data.amount,
      tip: data.tip,
    },
  },
});
