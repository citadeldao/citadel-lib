export const prepareRedelegation = ({
  net,
  address,
  from,
  to,
  amount,
  publicKey,
}) => {
  return {
    url: `transactions/${net}/${address}/prepare-redelegation?version=1.0.5`,
    method: 'post',
    data: {
      validator_src_address: from,
      validator_dst_address: to,
      amount,
      publicKey,
    },
  }
}
