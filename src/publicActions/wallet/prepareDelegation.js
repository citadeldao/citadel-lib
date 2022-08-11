import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const prepareDelegation = async (walletId, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )

  checkWalletId(walletId)
  const {
    nodeAddresses,
    amount,
    type,
    redelegateNodeAddress,
    kt,
    rewardsAddress,
    rewardsRestake,
    additionalFee,
    isWithoutDelegation,
  } = options
  checkTypes(
    // nodeAddress - Array for polkadot
    ['nodeAddress', nodeAddresses, ['Array']],
    ['amount', amount, ['String', 'Number']],
    ['type', type, ['String']],
    // Array for polkadot
    ['redelegateNodeAddress', redelegateNodeAddress, ['String', 'Array']],
    ['kt', kt, ['String']],
    ['rewardsAddress', rewardsAddress, ['String']],
    ['rewardsRestake', rewardsRestake, ['Boolean']],
    ['additionalFee', additionalFee, ['String', 'Number']],
    ['isWithoutDelegation', isWithoutDelegation, ['Boolean']]
  )

  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .prepareDelegation({
      nodeAddresses,
      amount,
      type,
      redelegateNodeAddress,
      kt,
      // for polkadot
      rewardsAddress,
      rewardsRestake,
      additionalFee,
      isWithoutDelegation,
    })
}
