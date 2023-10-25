import state from '../../../state'
// function returns request parameters for the axios instance.
export const getCrossNetFees = ({ netFrom, netTo }) => {
  let netKey = `${netFrom}_${netTo}`;
  const toSplitNet = netTo.split('_');
  
  if (netFrom === toSplitNet[0]) {
    netKey = netTo;
  }
  // backend domain is in the axios instance
  return {
    url: `/currency/${netKey}/fees`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
      },
    },
  }
}