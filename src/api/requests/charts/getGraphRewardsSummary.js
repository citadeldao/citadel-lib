export const getGraphRewardsSummary = ({ dateFrom, dateTo, listId }) => {
  return {
    url: `/transactions${
      listId ? `/list/${listId}` : ''
    }/graph-rewards-summary`,
    method: 'get',
    data: {
      params: {
        version: '1.0.1',
        date_from: dateFrom,
        date_to: dateTo,
      },
    },
  }
}
