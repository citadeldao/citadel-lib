export const polkadotPrepareStakeAndNominate = ({
  address,
  delegations,
  amount,
  tip,
  rewardsAddress,
  rewardsRestake,
}) => {
  return {
    url: `/transactions/polkadot/${address}/prepareStakeAndNominate`,
    method: 'get',
    data: {
      params: {
        delegations,
        amount,
        tip,
        rewardsAddress,
        rewardsRestake,
      },
    },
  }
}
