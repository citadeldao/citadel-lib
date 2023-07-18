import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  // checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get possible cross-network transfer routes for a given token (network)
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param token STRING (REQUIRED) - token key
 * 
 * @returns Returns ARRAY
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = citadel.getCrossNetworkRoutes('230071', 'osmosis')

  // =>
  {
    result: 'success',
    data: [
      {
        id: 0,
        key: 'cerberus',
        label: 'Cerberus',
      },
    // ...
    ],
    error: null,
  }
 */

export const getCrossNetworkRoutes = (walletId, token) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true]
  )
  checkWalletId(walletId)
  // checkNetworkOrToken(token)

  // call walletInstance method
  return walletInstances
    .getWalletInstanceById(walletId)
    .getCrossNetworkRoutes(token)
}
