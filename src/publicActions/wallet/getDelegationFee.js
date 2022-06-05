import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default (walletId, options) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )
  checkWalletId(walletId)

  const { transactionType, nodeAddress, sourceNodeAddress, kt, isWithoutDelegation } = options

  checkTypes(
    ['transactionType', transactionType, ['String'], true],
    // TODO: Для iost необязательно и есть transfer
    ['nodeAddress', nodeAddress, ['String','Null']],
    ['sourceNodeAddress', sourceNodeAddress, ['String']],
    ['kt', kt, ['String']],
    //only for icon
    ['isWithoutDelegation', isWithoutDelegation, ['Boolean']]
  )

  return walletInstances
    .getWalletInstanceById(walletId)
    .getDelegationFee({ transactionType, nodeAddress, sourceNodeAddress, kt, isWithoutDelegation })
}
