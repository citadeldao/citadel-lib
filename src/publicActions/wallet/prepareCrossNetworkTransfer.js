import {
  checkTypes,
  checkInitialization,
  checkWalletId,
  checkNetworkOrToken,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const prepareCrossNetworkTransfer = async function (
  walletId,
  token,
  options = {}
) {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['options', options, ['Object'], true]
  )
  checkWalletId(walletId)
  checkNetworkOrToken(token)

  const { toNetwork, toAddress, amount, fee, memo } = options
  checkTypes(
    ['toNetwork', toNetwork, ['String'], true],
    ['toAddress', toAddress, ['String'], true],
    ['amount', amount, ['Number', 'String'], true],
    ['fee', fee, ['Number', 'String']],
    ['memo', memo, ['String']]
  )

  checkNetworkOrToken(token)

  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .prepareCrossNetworkTransfer(token, options)
}
