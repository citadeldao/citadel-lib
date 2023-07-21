import state from '../../../../state'
import { OUR_TOKEN } from './../../../../constants'

// function returns request parameters for the axios instance.
export const getXctInflation = ({ address }) => ({
  url: `/blockchain/${OUR_TOKEN}/${address}/inflation`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
