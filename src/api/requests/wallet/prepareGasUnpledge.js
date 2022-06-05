export const prepareGasUnpledge = ({
  net,
  address,
  publicKey,
  toAddress,
  amount,
}) => {
  return {
    url: `/transactions/${net}/${address}/prepare-unpledge`,
    method: 'post',
    data: {
      publicKey,
      toAddress,
      amount,
    },
  }
}
