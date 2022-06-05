import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, token) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String']]
  )
  checkWalletId(walletId)
  token && checkNetworkOrToken(token)
  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (!token || token === walletInstance.net) {
    // native token balance
    return await walletInstance.getDelegationBalance()
  } else {
    return await walletInstance.callTokenInfo(token, 'balance')
  }
}
