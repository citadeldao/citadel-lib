// function returns request parameters for the axios instance.
export const getRewardsByRange = ({ dateFrom, dateTo }) => ({
  // backend domain is in the axios instance
  url: `/transactions/rewards-by-range`,
  method: 'get',
  data: {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
    },
  },
})
