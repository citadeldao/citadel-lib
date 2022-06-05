import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import storage from '../../storage'

export default async (walletId, title) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['title', title, ['String'], true]
  )
  checkWalletId(walletId)

  await walletInstances.getWalletInstanceById(walletId).renameTitle(title)

  storage.wallets.updateWallet({
    walletId,
    newWalletInfo: { title },
  })
}
