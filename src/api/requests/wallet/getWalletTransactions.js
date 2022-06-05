export const getWalletTransactions = ({
  net,
  address,
  params: { page = 1, pageSize = 10 } = {},
}) => {
  return {
    url: `/transactions/${net}/${address}`,
    method: 'get',
    data: {
      params: {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      },
    },
  }
}
