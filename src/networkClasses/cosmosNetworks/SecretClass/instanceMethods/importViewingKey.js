import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES, WALLET_TYPES } from '../../../../constants'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'
import networkClasses from '../../..'

export async function importViewingKey(token, viewingKey) {
  if (this.savedViewingKeys?.[token]?.viewingKey === viewingKey) return

  const { error } = await this.loadSnip20TokenBalance(
    token,
    viewingKey,
    VIEWING_KEYS_TYPES.CUSTOM
  )

  if (!error && this.type === WALLET_TYPES.KEPLR) {
    const chainId = keplrChains[this.net]
    const keplr = await this.getKeplr()
    // export vk to keplr
    await keplr.suggestToken(
      chainId,
      networkClasses.getNetworkClass(this.net).tokens[token].address,
      viewingKey
    )
  }

  // check VK
  error &&
    errors.throwError('ViewingKeyError', {
      message: `Viewing key is not valid. ${error.message || ''}`,
    })

  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
