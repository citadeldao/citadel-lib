import state from '../../../state'

// function returns request parameters for the axios instance.
export const getGraphRewardsSummary = ({ dateFrom, dateTo, listId }) => {
  return {
    // backend domain is in the axios instance
    url: `/transactions${
      listId ? `/list/${listId}` : ''
    }/graph-rewards-summary`,
    method: 'get',
    data: {
      params: {
        version: state.getState('backendApiVersion'),
        date_from: dateFrom,
        date_to: dateTo,
      },
    },
  }
}
