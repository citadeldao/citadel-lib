import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  // checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const getTransactionsById = async (walletId, options = {}) => {
  // checks
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
  // token && checkNetworkOrToken(token)

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (!options.token || options.token === walletInstance.net) {
    // for subtoken call token info
    return await walletInstance.getTransactions({
      page: options.page,
      pageSize: options.pageSize,
      kt,
    })
  } else {
    // for native token call walletInstance method
    return await walletInstance.callTokenInfo(options.token, 'transactions', {
      page: options.page,
      pageSize: options.pageSize,
    })
  }
}
