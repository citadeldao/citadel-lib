// function returns request parameters for the axios instance.
export const polkadotPrepareRedelegation = ({ address, delegations, tip }) => {
  return {
    // backend domain is in the axios instance
  url: `/transactions/polkadot/${address}/prepareReDelegation`,
    method: 'get',
    data: {
      params: {
        delegations,
        tip,
      },
    },
  }
}
