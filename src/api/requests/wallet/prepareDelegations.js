// multi stake
export const prepareDelegations = ({
  net,
  from,
  delegations,
  publicKey,
}) => {
  return {
    url: `/transactions/${net}/${from}/prepare-delegations?version=1.0.5`,
    method: 'post',
    data: {
      delegations,
      publicKey,
    },
  }
}
