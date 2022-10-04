// multi stake
// function returns request parameters for the axios instance.
export const prepareDelegations = ({
  net,
  from,
  delegations,
  publicKey,
  isTyped
}) => {
  return {
    // backend domain is in the axios instance
  url: `/transactions/${net}/${from}/prepare-delegations?version=1.1.0`,
    method: 'post',
    data: {
      delegations,
      publicKey,
      isTyped
    },
  }
}
