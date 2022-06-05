import storage from '../../storage'
import libCore from '../../libCore'
import errors from '../../errors'
import walletInstances from '../../walletInstances'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'
import { GET_WALLET_LIST_TYPES } from '../../constants'

export default async (type = GET_WALLET_LIST_TYPES.CACHE) => {
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
    const { data: wallets } = await libCore.formattedApi.getWallets()
    await libCore.updateWalletList(wallets)
  }
  // update walletList by detail request
  if (type === GET_WALLET_LIST_TYPES.DETAIL) {
    const { data: wallets } = await libCore.formattedApi.getWalletsDetail()
    await libCore.updateWalletList(wallets)
  }

  const storageWalletList = storage.wallets.getWalletList()
  // in case the list of wallets in the storage has been changed from another tab
  // update all instances for sync
  storageWalletList.map((wallet) => {
    walletInstances.updateWalletInstance(wallet)
  })

  return storageWalletList
}
