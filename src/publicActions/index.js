import { actionDecorator } from './actionDecorator'
import { general } from './general'
import { network } from './network'
import { walletList } from './walletList'
import { wallet } from './wallet'

// collect all public methods on one level for the client
const publicActions = {
  ...general,
  ...network,
  ...walletList,
  ...wallet,
}

// wrap lib methods to catch errors and format response
for (let action in publicActions) {
  publicActions[action] = actionDecorator(publicActions[action], action)
}

// export wrapped publicActions to client
export default publicActions
