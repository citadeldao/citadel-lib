import { common } from './common'
import { network } from './network'
import { wallet } from './wallet'
import { charts } from './charts'
import { walletList } from './walletList'
import { tokens } from './tokens'
import { dao } from './dao'
import { rewards } from './rewards'
import { investors } from './investors'
import { sockets } from './sockets'

/**
 * REQUESTS:
 *
 * Functions that return an object with request parameters for axios-instance.
 * The URL with the backend domain is in the axios instance
 */

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
  ...sockets,
}
