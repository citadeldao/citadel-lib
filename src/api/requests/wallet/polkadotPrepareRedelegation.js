export const polkadotPrepareRedelegation = ({ address, delegations, tip }) => {
  return {
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
