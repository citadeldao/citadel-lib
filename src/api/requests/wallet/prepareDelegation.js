// single stake
export const prepareDelegation = ({
  net,
  from,
  toAddress,
  publicKey,
  amount,
  kt,
}) => {
  return {
    url: `/transactions/${net}/${from}/prepare-delegation?version=1.0.5`,
    method: 'post',
    data: {
      toAddress,
      publicKey,
      amount,
      kt,
    },
  }
}
