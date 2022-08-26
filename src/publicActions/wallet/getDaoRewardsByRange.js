import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get rewards for the specified period for each wallet that is linked to the DAO through the given bsc address
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - BSC wallet id
 * @param dateFrom STRING, NUMBER (REQUIRED) - start of period in ms
 * @param dateTo  STRING, NUMBER (OPTIONAL) - end of period in ms (today by default)
 * 
 * @returns Returns ARRAY
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getDaoRewardsByRange(
    '224419',
    '1641360964145',
    '1649396164145'
  )

  // =>
  {
    result: 'success',
    data: [
      {
        net: 'juno',
        address: 'juno1eksvfd7400dr6fvkdh4mshfkukm9u8aqmzcf2v',
        rewards: 0.00779,
      },
      {
        net: 'icon',
        address: 'hx759256245a0ae43d2200c9a1e199424b418c710e',
        rewards: 0.200478,
      },
    ],
    error: null,
  }
 */

export const getDaoRewardsByRange = async (walletId, dateFrom, dateTo) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['dateFrom', dateFrom, ['String', 'Number'], true],
    ['dateTo', dateTo, ['String', 'Number'], true]
  )
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .getDaoRewardsByRange(dateFrom, dateTo)
}
