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

export const executeContract = async (walletId, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )
  checkWalletId(walletId)

  const { privateKey, derivationPath, contract, gas, msg, sender, sentFunds } =
    options

  checkTypes(
    ['contract', contract, ['String'], true],
    ['gas', gas, ['String', 'Number']],
    ['msg', msg, ['Object'], true],
    ['sender', sender, ['String']],
    ['sentFunds', sentFunds, ['String']]
  )

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  // call wallet instance method
  return await walletInstance.executeContract(options)
}
