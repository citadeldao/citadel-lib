export const getPrepareTransferFund = ({
  address,
  category,
  amount,
  recipient,
}) => ({
  url: `/blockchain/bsc_xct/${address}/builder/transfer_fund`,
  method: 'get',
  data: {
    params: {
      category,
      amount,
      recipient,
    },
  },
})
