import {
  USERS_SOCKET_EVENT_NAMES,
  MARKETCAPS_SOCKET_EVENT_NAMES,
} from '../../constants'
import { addressBalanceUpdatedСlient } from './addressBalanceUpdatedСlient'
import { mempoolRemoveTxClient } from './mempoolRemoveTxClient'
import { marketcapUpdateClient } from './marketcapUpdateClient'

// computed properties to prevent errors and easy use in loops
export const eventHandlers = {
  [USERS_SOCKET_EVENT_NAMES.ADDRESS_BALANCE_UPDATED_CLIENT]:
    addressBalanceUpdatedСlient,
  [USERS_SOCKET_EVENT_NAMES.MEMPOOL_REMOVE_TX_CLIENT]: mempoolRemoveTxClient,
  [MARKETCAPS_SOCKET_EVENT_NAMES.MARKETCAP_UPDATE_CLIENT]:
    marketcapUpdateClient,
}
