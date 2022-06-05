export const getRewardsByRange = ({ dateFrom, dateTo }) => ({
  url: `/transactions/rewards-by-range`,
  method: 'get',
  data: {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
    },
  },
})
