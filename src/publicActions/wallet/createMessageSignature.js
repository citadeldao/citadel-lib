import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const createMessageSignature = async (
  walletId,
  message,
  { privateKey, derivationPath }
) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['message', message, ['String', 'Object'], true],
    ['privateKey', privateKey, ['String'], true]
  )
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .createMessageSignature(message, {
      privateKey,
      derivationPath,
    })
}
