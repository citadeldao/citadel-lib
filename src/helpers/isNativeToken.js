import { CACHE_NAMES } from '../constants'
import state from '../state'

export const isNativeToken = (token) => {
  return state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS).includes(token)
}
