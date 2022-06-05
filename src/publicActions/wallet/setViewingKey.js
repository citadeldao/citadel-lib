import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../constants'
import walletInstances from '../../walletInstances'

export default async (walletId, token, viewingKeyType, options) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['viewingKeyType', viewingKeyType, ['String'], true],
    ['options', options, ['Object'], true]
  )
  checkNetworkOrToken(token)

  checkWalletId(walletId)

  const { viewingKey, fee, privateKey, derivationPath } = options

  checkTypes(
    ['viewingKey', viewingKey, ['String']],
    ['fee', fee, ['String', 'Number']]
  )

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  return await walletInstance.setViewingKey(token, viewingKeyType, options)
}
