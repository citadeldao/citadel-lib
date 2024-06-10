import { prepareAssignToDaoMessage } from './prepareAssignToDaoMessage'
import { sendAssignToDaoMessage } from './sendAssignToDaoMessage'
import { removeAssignToDaoMessage } from './removeAssignToDaoMessage'
import { getDaoSupportedNetworks } from './getDaoSupportedNetworks'
import { getDaoWallets } from './getDaoWallets'
import { getDaoRewardsByRange } from './getDaoRewardsByRange'
import { getDaoCalculatorData } from './getDaoCalculatorData'
import { getAllDaoRewards } from './getAllDaoRewards'

export const dao = {
  prepareAssignToDaoMessage,
  sendAssignToDaoMessage,
  removeAssignToDaoMessage,
  getDaoSupportedNetworks,
  getDaoWallets,
  getDaoRewardsByRange,
  getDaoCalculatorData,
  getAllDaoRewards,
}
