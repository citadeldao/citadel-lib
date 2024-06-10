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

/**
 * assigns a BSC (XCT) address to a wallet to receive XCT for staking
 *
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param holderAddress STRING (REQUIRED) - BSC address to be assigned to the wallet
 * @param options OBJECT (REQUIRED) = { privateKey, derivationPath }
 * @param options.privateKey STRING (OPTIONAL) - the private key of the wallet which we assign the BSC address (not BSC private key!)
 * @param options.derivationPath STRING (OPTIONAL) - for hardware wallets
 * 
 * @returns Returns NULL
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.assignToDao(
    '12345',
    '0x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2',
    {
      privateKey: 'L54AvJyYLo9kNCPGpL6mSqworGwJ9nfWYXRmMRXgHExvdfY2kSpb'
    }
  )

  // =>
  {
    "result": "success",
    "data": null,
    "error": null
  }
 */

export const removeToDao = async (walletId, holderAddress, options) => {
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
  return await walletInstance.removeToDao(holderAddress, options)
}
