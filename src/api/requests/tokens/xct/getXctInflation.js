export const getXctInflation = ({ address }) => ({
  url: `/blockchain/bsc_xct/${address}/inflation`,
  method: 'get',
})
