import { setViewingKey } from './setViewingKey'
import walletInstances from '../../walletInstances'
import errors from '../../errors'
import { checkTypes } from '../../helpers/checkArguments'

export const setViewingKeyByContract = async (
  walletId,
  contract,
  viewingKeyType,
  options
) => {
  checkTypes(['contract', contract, ['String'], true])

  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  // find token key by contract
  const token = Object.values(walletInstance.getTokens()).find(
    ({ address }) => address === contract
  )
  // check contract address (all other checks are already in 'setViewingKey' function)
  !token &&
    errors.throwError('WrongArguments', {
      message: `Token with contract ${contract} on network ${walletInstance.net} is not supported or not yet implemented`,
    })

  console.log('>>>> token', token)

  // set vk by token key
  return await setViewingKey(walletId, token.net, viewingKeyType, options)
}
