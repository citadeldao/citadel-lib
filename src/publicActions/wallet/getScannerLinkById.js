import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get a link with address scanner
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * 
 * @returns Returns STRING
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = citadel.getScannerLinkById('175748')

  // =>
  {
    "result": "success",
    "data": "https://www.mintscan.io/persistence/account/persistence1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n2tzcvjc",
    "error": null
  }
 */

export const getScannerLinkById = (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return walletInstances.getWalletInstanceById(walletId).getScannerLinkById()
}
