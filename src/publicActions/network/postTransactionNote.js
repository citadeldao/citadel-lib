import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetworkOrToken,
  checkInitialization,
} from '../../helpers/checkArguments'
import api from '../../api'
import { isNativeToken } from '../../helpers/isNativeToken'

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

  checkNetworkOrToken(netOrToken)

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
