import { actionDecorator } from './actionDecorator'
import { general } from './general'
import { network } from './network'
import { walletList } from './walletList'
import { wallet } from './wallet'

/**************** PUBLIC ACTIONS MODULE *******************
 * Exports by default an object with all library methods for the client application
 * NOTE: Module methods have a minimum of logic, and a maximum of checks.
 *
 * Conditionally divided into four groups:
 *   GENERAL: 'init', 'reset' and other methods that are not included in other groups
 *   NETWORK: Methods that take a network key as an argument. Wrappers over static methods of grid classes
 *   WALLET: Methods that take wallet ID as an argument. Wrappers over wallet instance methods
 *   WALLETLIST: Methods for managing the list of wallets. Typically, wrappers over a module WALLETS MANAGER
 *
 * All methods are wrapped in a decorator to catch errors and format response
 *
 * NOTE: Keep documentation up to date!
 **********************************************************/

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
