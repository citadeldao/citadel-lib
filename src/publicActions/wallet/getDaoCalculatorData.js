import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get data to calculate expected rewards (for BSC wallet only)
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - BSC wallet id
 * 
 * @returns Returns ARRAY
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getDaoCalculatorData('224419')

  // =>
  {
    result: 'success',
    data: {
      bsc_xct: {
        price: 0.078027802,
        countAddresses: 1,
        activeTokens: '3.961124',
        totalTokens: '33.905134',
        rewardsPerToken: '0.44200069031042436955',
        rewardsMonthly: '0.0368333908592020308',
        checkMonthly: '0.1459016285337657850506192',
      },
      cosmos: {
        countAddresses: 3,
        activeTokens: '1.508362',
        totalTokens: '1.538362',
        price: 24.30150927,
        rewardsPerToken: '10.7933216941371379688700866505',
        rewardsMonthly: '0.89944347451142816407',
        checkMonthly: '1.35668635810100680841295334',
      },
    },
    error: null,
  }
 */

export const getDaoCalculatorData = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .getDaoCalculatorData()
}
