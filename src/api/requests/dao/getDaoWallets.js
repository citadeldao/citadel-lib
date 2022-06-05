const qs = require('qs');

export const getDaoWallets = ({ list }) => ({
  url: `/dao/wallets`,
  method: 'post',
  data: {
    list,
    paramsSerializer: params => qs.stringify(params),
  },
});