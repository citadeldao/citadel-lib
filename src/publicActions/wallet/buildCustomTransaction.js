import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * prepare custom transaction (claim-stake cosmos etc)
 *
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param data OBJECT (REQUIRED) - transaction data
 * 
 * @returns Returns object with transaction ans fee
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
    "data": {
      transaction: main transaction
      fee: float
    },
    "error": null
  }
 */

export const buildCustomTransaction = async (walletId, data) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['data', data, ['Object'], true]
  )
  checkWalletId(walletId)

  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .buildCustomTransaction(data)
}
