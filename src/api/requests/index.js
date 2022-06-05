import common from './common'
import network from './network'
import wallet from './wallet'
import charts from './charts'
import walletList from './walletList'
import tokens from './tokens'
import dao from './dao'
import rewards from './rewards'
import investors from './investors'

export const requests = {
  ...common,
  ...network,
  ...wallet,
  ...tokens,
  ...dao,
  ...rewards,
  ...walletList,
  ...charts,
  ...investors,
}
