import { assignedAddresses } from './assignedAddresses'
import { totalClaimedRewards } from './totalClaimedRewards'
import { marketcap } from './marketcap'
import { balance } from './balance'
import { transactions } from './transactions'
import { inflation } from './inflation'

// group all infos
const infos = {
  balance,
  assignedAddresses,
  marketcap,
  inflation,
  totalClaimedRewards,
  transactions,
}

// get info function by name and type
export const infosStore = {
  getItem(infoName, infoType) {
    return infos[infoName][infoType]
  },
}
