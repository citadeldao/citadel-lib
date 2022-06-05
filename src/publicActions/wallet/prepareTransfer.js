import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, options) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )
  checkWalletId(walletId)

  return await walletInstances.getWalletInstanceById(walletId).prepareTransfer(options)
}
