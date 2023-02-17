import state from '../../../state'
// function returns request parameters for the axios instance.
export const polkadotPrepareStakeAndNominate = ({
  address,
  delegations,
  amount,
  tip,
  rewardsAddress,
  rewardsRestake,
}) => {
  return {
    // backend domain is in the axios instance
    // url: `/transactions/polkadot/${address}/prepareStakeAndNominate`,
    url: `/blockchain/polkadot/${address}/builder/stakeAndNominate`,
    method: 'get',
    data: {
      params: {
        delegations,
        amount,
        tip,
        rewardsAddress,
        rewardsRestake,
        version: state.getState('backendApiVersion'),
      },
    },
  }
}
