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

export const signAndSendMulti = async (
  walletId,
  rawTransactions,
  options = {}
) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['rawTransactions', rawTransactions, ['Array'], true],
    ['options', options, ['Object']]
  )

  const { privateKey, derivationPath, proxy, useAlternativeSigner, transportType = 'usb' } = options

  checkTypes(['proxy', proxy, ['Boolean']])
  checkTypes(['useAlternativeSigner', useAlternativeSigner, ['Boolean']])

  checkWalletId(walletId)
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
    .signAndSendMulti(rawTransactions, { privateKey, derivationPath, proxy, useAlternativeSigner, transportType })
}
