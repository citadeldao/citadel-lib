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

/**
 * Converts native secret to secret_scrt SNIP-20 token
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param options OBJECT (REQUIRED) = { amount, privateKey, derivationPath, fee }
 * @param options.amount STRING, NUMBER (REQUIRED) native secret amount to convert
 * @param options.privateKey STRING (OPTIONAL) wallet private key
 * @param options.derivationPath STRING (OPTIONAL) derivation path for hardware (or polkadot) wallet
 * @param options.fee STRING (OPTIONAL) - transaction fee (0.002 by default)
 * 
 * @returns Returns ARRAY with transaction hash string (['hexHashString'])
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.convertScrtToSecretScrt(
    '122393',
    {
      privateKey: 'c0e4b57b19c18b21056dd3acad16933ceea1f7564e542dcb3990cc5fbba4b71f',
      fee: 0.1
    }
  )

  // =>
  {
    "result": "success",
    "data": "8AE106F89664023F6B667380CD6362A40A5F5D4AC0EC4B622B1BFB451AEC0E19",
    "error": null
  }
 */

export const convertScrtToSecretScrt = async (walletId, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )

  checkWalletId(walletId)

  const { amount, fee, privateKey, derivationPath } = options

  checkTypes(
    ['amount', amount, ['Number', 'String'], true],
    ['fee', fee, ['Number', 'String']]
  )

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .convertScrtToSecretScrt({ amount, fee, privateKey, derivationPath })
}
