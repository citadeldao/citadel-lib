import state from '../../../state'

// function returns request parameters for the axios instance.
export const polkadotListOfValidators = ({ address }) => ({
  // backend domain is in the axios instance
  // url: `/transactions/polkadot/${address}/prepareListOfValidators`,
  url: `/blockchain/polkadot/${address}/listOfValidators`,
  method: 'get',
  data: {
    params: {
      version: state.getState('backendApiVersion'),
    },
  },
})
