import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../constants'
import walletInstances from '../../walletInstances'

export const signMessage = async (walletId, message, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['message', message, ['String', 'Object'], true],
    ['options', options, ['Object']]
  )
  checkWalletId(walletId)
  const { privateKey, derivationPath, transportType = 'usb' } = options
  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .signMessage(message, { privateKey, derivationPath, transportType })
}
