import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, options = {}) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object']]
  )
  checkWalletId(walletId)

  const { page, pageSize, token, kt } = options
  checkTypes(
    ['page', page, ['Number', 'String']],
    ['pageSize', pageSize, ['Number', 'String']],
    ['token', token, ['Number', 'String']],
    ['kt', kt, ['String']]
  )
  token && checkNetworkOrToken(token)

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (!options.token || options.token === walletInstance.net) {
    // native token balance
    return await walletInstance.getTransactions({
      page: options.page,
      pageSize: options.pageSize,
      kt,
    })
  } else {
    // subtoken
    return await walletInstance.callTokenInfo(options.token, 'transactions', {
      page: options.page,
      pageSize: options.pageSize,
    })
  }
}
