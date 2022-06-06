import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkDaoSupport,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'
import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../constants'

export const assignToDao = async (walletId, holderAddress, options) => {
  // checks
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

  checkNetworkDaoSupport(walletInstance.net)

  // call wallet instance method
  return await walletInstance.assignToDao(holderAddress, options)
}
