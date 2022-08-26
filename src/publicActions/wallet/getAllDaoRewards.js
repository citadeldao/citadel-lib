import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get an array with rewords of all wallets linked to the BSC address
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - BSC wallet id
 * 
 * @param token  STRING (REQUIRED) - the token for which the Viewing Key is being removed
 *
 * @returns Returns ARRAY
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getAllDaoRewards('224419')

  // =>
  {
    result: 'success',
    data: [
      {
        net: 'akash',
        address: 'akash1ecnplu9urr2ds3tx4dyv2t6wwwgrw58aruatac',
        rewards: 0.152239,
      },
      // ...
      {
        net: 'umee',
        address: 'umee1eksvfd7400dr6fvkdh4mshfkukm9u8aqlxxdfz',
        rewards: 0.000329,
      },
    ],
    error: null,
  }
 */

export const getAllDaoRewards = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .getAllDaoRewards()
}
