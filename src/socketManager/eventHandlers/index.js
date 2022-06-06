import { SOCKET_EVENT_NAMES } from '../../constants'
import { addressBalanceUpdatedСlient } from './addressBalanceUpdatedСlient'
import { mempoolRemoveTxClient } from './mempoolRemoveTxClient'

// computed properties to prevent errors and easy use in loops
export const eventHandlers = {
  [SOCKET_EVENT_NAMES.ADDRESS_BALANCE_UPDATED_CLIENT]:
    addressBalanceUpdatedСlient,
  [SOCKET_EVENT_NAMES.MEMPOOL_REMOVE_TX_CLIENT]: mempoolRemoveTxClient,
}
