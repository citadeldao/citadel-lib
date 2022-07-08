import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import walletsManager from '../../walletsManager'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const renameWalletTitleById = async (walletId, title) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['title', title, ['String'], true]
  )
  checkWalletId(walletId)

  // call wallet instance method
  await walletInstances.getWalletInstanceById(walletId).renameTitle(title)

  // update wallet
  walletsManager.updateWallet({
    walletId,
    newWalletInfo: { title },
  })

  // EVENT: inform the client that it is time to update wallet list
  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)
}
