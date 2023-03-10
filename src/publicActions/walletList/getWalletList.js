import api from '../../api'
import walletsManager from '../../walletsManager'
import errors from '../../errors'
// import walletInstances from '../../walletInstances'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'
import { GET_WALLET_LIST_TYPES, LIB_EVENT_BLOCK_FLAGS } from '../../constants'
// import storage from '../../storage'
import state from '../../state'
import { sleep } from '../../helpers/sleep'

export const getWalletList = async (type = GET_WALLET_LIST_TYPES.CACHE) => {
  // checks
  checkInitialization()
  checkTypes(['type', type, ['String']])

  !Object.values(GET_WALLET_LIST_TYPES).includes(type) &&
    errors.throwError('WrongArguments', {
      message: `Invalid type. Expected '${Object.values(
        GET_WALLET_LIST_TYPES
      ).join(', ')}', got '${type}'`,
    })

  // update walletList by wallets request
  if (type === GET_WALLET_LIST_TYPES.WALLETS) {
    // get account wallets
    const { data: wallets } = await api.requests.getWallets()
    // update lib wallets
    await walletsManager.updateWalletList(wallets)
  }
  // update walletList by detail request
  if (type === GET_WALLET_LIST_TYPES.DETAIL) {
    let delayFlag = state.getState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL)
    while (delayFlag) {
      await sleep(300)
      delayFlag = state.getState(LIB_EVENT_BLOCK_FLAGS.DELAY_WALLET_LIST_UPDATE_DETAIL)
    }
    // get detailed account wallets
    const { data: wallets } = await api.requests.getWalletsDetail()
    // update lib wallets
    await walletsManager.updateWalletList(wallets)
  }

  // get walletList
  const walletList = walletsManager.getWalletList()

  // for 'lazy' request sync walletInstances with storage (in case localStorage has been changed from another tab)
  // if (type === GET_WALLET_LIST_TYPES.LAZY) {
  //   // get walletList object from storage
  //   const walletListObject = storage.wallets.getWalletListObject()
  //   walletList.map((wallet) => {
  //     if (!walletListObject[wallet.id]) {
  //       // create wallet instance for new wallet, which was added in another tab
  //       walletInstances.createWalletInstance(wallet)
  //     } else {
  //       // sync existing wallet instances with storage
  //       walletInstances.updateWalletInstance(wallet)
  //     }
  //   })
  // }

  return walletList
}
