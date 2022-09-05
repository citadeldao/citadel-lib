import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES, WALLET_TYPES } from '../../../../constants'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'

export async function balance_scrt({ token }) {
  // CHECK SAVED VK
  if (this.savedViewingKeys[token]) {
    const { viewingKey, viewingKeyType } = this.savedViewingKeys[token]

    // get balance (and save/delete vk, update subtokensList)
    const { tokenBalance, error } = await this.loadSnip20TokenBalance(
      token,
      viewingKey,
      viewingKeyType
    )

    if (!error) {
      return tokenBalance
    }

    // throw error if simple vk is invalid for privateKey wallets
    if (
      viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE &&
      this.type !== WALLET_TYPES.KEPLR
    ) {
      dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
      errors.throwError('ViewingKeyError')
    }
  }

  // try simple or keplr VK
  const { viewingKey: newViewingKey, viewingKeyType } =
    await this.getPossibleViewingKeyForCheck(token)
  // throw VK error if no generated VK
  if (!newViewingKey) {
    errors.throwError('ViewingKeyError')
  }

  // get balance (and save/delete vk, update subtokensList)
  const { tokenBalance, error } = await this.loadSnip20TokenBalance(
    token,
    newViewingKey,
    viewingKeyType
  )

  // VK is not valid
  if (error) {
    errors.throwError('ViewingKeyError', { message: error })
  }

  return tokenBalance
}
