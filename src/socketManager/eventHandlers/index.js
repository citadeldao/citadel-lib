import {
  USERS_SOCKET_EVENT_NAMES,
  MARKETCAPS_SOCKET_EVENT_NAMES,
} from '../../constants'
import { addressBalanceUpdated–°lient } from './addressBalanceUpdated–°lient'
import { mempoolRemoveTxClient } from './mempoolRemoveTxClient'
import { marketcapUpdateClient } from './marketcapUpdateClient'
import { messageFromApp } from './messageFromApp'

// computed properties to prevent errors and easy use in loops
export const eventHandlers = {
  [USERS_SOCKET_EVENT_NAMES.ADDRESS_BALANCE_UPDATED_CLIENT]:
    addressBalanceUpdated–°lient,
  [USERS_SOCKET_EVENT_NAMES.MEMPOOL_REMOVE_TX_CLIENT]: mempoolRemoveTxClient,
  [USERS_SOCKET_EVENT_NAMES.MESSAGE_FROM_APP]: messageFromApp,
  [MARKETCAPS_SOCKET_EVENT_NAMES.MARKETCAP_UPDATE_CLIENT]:
    marketcapUpdateClient,
}
