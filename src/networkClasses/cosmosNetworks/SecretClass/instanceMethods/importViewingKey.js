import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import networkClasses from '../../../'

// TODO: refact!
export async function importViewingKey(token, viewingKey) {
  // dynamic import module with huge npm package
  const { default: snip20Manager } = await import('../snip20Manager')
  const networkClass = networkClasses.getNetworkClass(this.net)

  if (this.savedViewingKeys?.[token]?.viewingKey === viewingKey) return
  // check VK
  const { error } = await snip20Manager.getTokenBalance(
    this.address,
    networkClass.tokens[token].address,
    networkClass.tokens[token].decimals,
    viewingKey
  )
  error &&
    errors.throwError('ViewingKeyError', {
      message: `Viewing key is not valid. ${error.message}`,
    })
  this._saveViewingKeyToInstance(token, viewingKey, VIEWING_KEYS_TYPES.CUSTOM)
  await this._saveViewingKeysToStorage()
  // updateSubTokenBalances
  await this.updateSubtokensList([token])
}
