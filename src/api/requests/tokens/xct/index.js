import { getXctStakeTransaction } from './getXctStakeTransaction'
import { getXctUnstakeTransaction } from './getXctUnstakeTransaction'
import { restakeAllRewards } from './restakeAllRewards'
import { restakeXctRewards } from './restakeXctRewards'
import { restakeDaoRewards } from './restakeDaoRewards'
import { claimAllRewards } from './claimAllRewards'
import { claimXctRewards } from './claimXctRewards'
import { claimDaoRewards } from './claimDaoRewards'
import { getDaoAssignedAddresses } from './getDaoAssignedAddresses'
import { getTotalClaimedRewardsXct } from './getTotalClaimedRewardsXct'
import { getXctInflation } from './getXctInflation'
import { getXctRewards } from './getXctRewards'

export const xct = {
  getXctStakeTransaction,
  getXctUnstakeTransaction,
  restakeAllRewards,
  restakeXctRewards,
  restakeDaoRewards,
  claimAllRewards,
  claimXctRewards,
  claimDaoRewards,
  getDaoAssignedAddresses,
  getTotalClaimedRewardsXct,
  getXctInflation,
  getXctRewards
}
