import state from '../../../state'

const qs = require('qs')
// function returns request parameters for the axios instance.
export const getDaoWallets = ({ list }) => ({
  // backend domain is in the axios instance
  url: `/dao/wallets?version=${state.getState('backendApiVersion')}`,
  method: 'post',
  data: {
    list,
    paramsSerializer: (params) => qs.stringify(params),
  },
})
