export const getDaoRewardsByRange = ({ address, date_from, date_to }) => ({
  url: `/dao/rewardsHistory/${address}`,
  method: 'get',
  data: {
    params: {
      date_from,
      date_to,
      groups: 0,
    },
  },
})
