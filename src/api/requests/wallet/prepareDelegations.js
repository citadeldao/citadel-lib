// multi stake
// function returns request parameters for the axios instance.
export const prepareDelegations = ({
  net,
  from,
  delegations,
  publicKey,
}) => {
  return {
    // backend domain is in the axios instance
  url: `/transactions/${net}/${from}/prepare-delegations?version=1.0.5`,
    method: 'post',
    data: {
      delegations,
      publicKey,
    },
  }
}
