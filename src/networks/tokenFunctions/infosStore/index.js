import assignedAddressesInfos from './assignedAddresses'
import totalClaimedRewardsInfos from './totalClaimedRewards'
import marketcapInfos from './marketcap'
import balanceInfos from './balance'
import transactions from './transactions'
import inflationInfos from './inflation'

const infos = {
  balance: {
    ...balanceInfos,
  },
  assignedAddresses: {
    ...assignedAddressesInfos,
  },
  marketcap: {
    ...marketcapInfos,
  },
  inflation: {
    ...inflationInfos,
  },
  totalClaimedRewards: {
    ...totalClaimedRewardsInfos,
  },
  transactions: {
    ...transactions,
  },
}

export default {
  getItem(infoName, infoType) {
    return infos[infoName][infoType]
  },
}
