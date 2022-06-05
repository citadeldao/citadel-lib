import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, token) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true]
  )
  checkWalletId(walletId)

  return await walletInstances
    .getWalletInstanceById(walletId)
    .deleteViewingKey(token)
}
