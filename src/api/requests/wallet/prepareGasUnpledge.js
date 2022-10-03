// function returns request parameters for the axios instance.
export const prepareGasUnpledge = ({
  net,
  address,
  publicKey,
  toAddress,
  amount,
}) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions/${net}/${address}/prepare-unpledge`,
    method: 'post',
    data: {
      publicKey,
      toAddress,
      amount,
      version: '1.1.0',
    },
  }
}
