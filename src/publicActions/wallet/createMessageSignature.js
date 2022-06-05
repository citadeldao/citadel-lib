import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, message, { privateKey, derivationPath }) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['message', message, ['String', 'Object'], true],
    ['privateKey', privateKey, ['String'], true]
  )
  checkWalletId(walletId)

  return await walletInstances
    .getWalletInstanceById(walletId)
    .createMessageSignature(message, {
      privateKey,
      derivationPath,
    })
}
