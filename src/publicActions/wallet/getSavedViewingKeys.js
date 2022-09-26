import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get a list of tokens with saved Viewing Keys
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * 
 * @returns Returns ARRAY
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = citadel.getSavedViewingKeys(walletId)

  // =>
  {
    "result": "success",
    "data": {
      "secret_scrt": {
        "token": "secret_scrt",
        "contractAddress": "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
        "viewingKeyType": "custom",
        "viewingKey": "custom_viewing_key"
      },
      "secret_ocean": {
        "token": "secret_ocean",
        "contractAddress": "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps",
        "viewingKeyType": "simple",
        "viewingKey": "api_key_f844a82ffedd2e16ccf5261542e482f6b19fe10846dd51f0e83a02053104a337"
      }
    },
    "error": null
  }
 */

export const getSavedViewingKeys = (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return walletInstances.getWalletInstanceById(walletId).getSavedViewingKeys()
}
