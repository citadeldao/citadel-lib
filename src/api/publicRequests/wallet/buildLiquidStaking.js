import state from '../../../state'
import qs from 'qs'

// function returns request parameters for the axios instance.
export const buildLiquidStaking = ({ address, publicKey, contractAddress, amount, action, nftId }) => {
  return {
    url: `/blockchain/stacks/${address}/buildLiquidStacking?amount=${amount}&action=${action}&nftId=${nftId}&contractAddress=${contractAddress}`,
    method: 'get',
    data: {
      params: {
        publicKey,
        version: state.getState('backendApiVersion'),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params)
      },
    },
  }
}
