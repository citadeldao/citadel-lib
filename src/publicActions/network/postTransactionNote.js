import networkClasses from '../../networkClasses'
import {
  checkTypes,
  // checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import api from '../../api'
import { isNativeToken } from '../../helpers/isNativeToken'

/**
 * Adds a comment to a transaction
 *
 * @param netOrToken STRING (REQUIRED) - net / token key
 * @param transactionHash STRING (REQUIRED) - transaction hash
 * @param text STRING (OPTIONAL) -note
 * 
 * @returns Returns NULL
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = citadel.postTransactionNote(
    'akash',
    'BE861BB5C30B0055E7970BB3E20C8FD5E8D3B883FF7E38C001CC403BBEE2C68D',
    'important note'
  )

  // =>
  {
    result: 'success',
    data: null,
    error: null,
  }
 */

export const postTransactionNote = async (
  netOrToken,
  transactionHash,
  text = ''
) => {
  checkInitialization()
  checkTypes(
    ['netOrToken', netOrToken, ['String'], true],
    ['transactionHash', transactionHash, ['String'], true],
    ['text', text, ['String']]
  )

  // checkNetworkOrToken(netOrToken)

  // TODO: move if to static method

  // for native token call static network method
  if (isNativeToken(netOrToken)) {
    return await networkClasses
      .getNetworkClass(netOrToken)
      .postTransactionNote(transactionHash, text)
  }

  // for subtoken call api
  const { data } = await api.requests.postTransactionNote({
    net: netOrToken,
    transactionHash,
    text,
  })

  return data
}
