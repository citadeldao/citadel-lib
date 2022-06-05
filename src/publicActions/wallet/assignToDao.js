import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../constants'

export default async (walletId, holderAddress, options) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['holderAddress', holderAddress, ['String'], true],
    ['options', options, ['Object'], true]
  )

  const { privateKey, derivationPath } = options
  checkWalletId(walletId)
  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  checkWalletId(walletId)
  return await walletInstances
    .getWalletInstanceById(walletId)
    .assignToDao(holderAddress, options)
}
