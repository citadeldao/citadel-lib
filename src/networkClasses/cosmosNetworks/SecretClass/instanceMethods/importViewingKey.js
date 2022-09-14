import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function importViewingKey(token, viewingKey) {
  if (this.savedViewingKeys?.[token]?.viewingKey === viewingKey) return

  const { error } = await this.loadSnip20TokenBalance(
    token,
    viewingKey,
    VIEWING_KEYS_TYPES.CUSTOM
  )

  // check VK
  error &&
    errors.throwError('ViewingKeyError', {
      message: `Viewing key is not valid. ${error.message || ''}`,
    })

  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
