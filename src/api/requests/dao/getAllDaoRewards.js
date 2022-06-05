export const getAllDaoRewards = ({ address }) => ({
  url: `/dao/rewardsHistoryOverall/${address}`,
  method: 'get',
});