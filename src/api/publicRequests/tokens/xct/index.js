import { getXctStakeTransaction } from './getXctStakeTransaction'
import { getXctUnstakeTransaction } from './getXctUnstakeTransaction'
import { restakeXctRewards } from './restakeXctRewards'
import { claimXctRewards } from './claimXctRewards'
import { getTotalClaimedRewardsXct } from './getTotalClaimedRewardsXct'
import { getXctInflation } from './getXctInflation'
import { getXctRewards } from './getXctRewards'

// import { claimDaoRewards } from './claimDaoRewards'
// import { getDaoAssignedAddresses } from './getDaoAssignedAddresses'
// import { restakeAllRewards } from './restakeAllRewards'
// import { restakeDaoRewards } from './restakeDaoRewards'
// import { claimAllRewards } from './claimAllRewards'

export const xct = {
  getXctStakeTransaction,
  getXctUnstakeTransaction,
  claimXctRewards,
  restakeXctRewards,
  getTotalClaimedRewardsXct,
  getXctInflation,
  getXctRewards
  
  // restakeAllRewards,
  // restakeDaoRewards,
  // claimAllRewards,
  // claimDaoRewards,
  // getDaoAssignedAddresses,
  
}
