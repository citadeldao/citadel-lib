import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, token, viewingKey) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['viewingKey', viewingKey, ['String'], true]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)
  return await walletInstances
    .getWalletInstanceById(walletId)
    .importViewingKey(token, viewingKey)
}
