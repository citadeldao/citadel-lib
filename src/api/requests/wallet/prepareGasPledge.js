export const prepareGasPledge = ({
  net,
  address,
  publicKey,
  toAddress,
  amount,
}) => {
  return {
    url: `/transactions/${net}/${address}/prepare-pledge`,
    method: 'post',
    data: {
      publicKey,
      toAddress,
      amount,
    },
  }
}
