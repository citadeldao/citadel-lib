import { prepareAssignToDaoMessage } from './prepareAssignToDaoMessage'
import { sendAssignToDaoMessage } from './sendAssignToDaoMessage'
import { getDaoSupportedNetworks } from './getDaoSupportedNetworks'
import { getDaoWallets } from './getDaoWallets'
import { getDaoRewardsByRange } from './getDaoRewardsByRange'
import { getDaoCalculatorData } from './getDaoCalculatorData'
import { getAllDaoRewards } from './getAllDaoRewards'

export const dao = {
  prepareAssignToDaoMessage,
  sendAssignToDaoMessage,
  getDaoSupportedNetworks,
  getDaoWallets,
  getDaoRewardsByRange,
  getDaoCalculatorData,
  getAllDaoRewards,
}
