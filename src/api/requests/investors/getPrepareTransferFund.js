// function returns request parameters for the axios instance.
export const getPrepareTransferFund = ({
  address,
  category,
  amount,
  recipient,
}) => ({
  // backend domain is in the axios instance
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
