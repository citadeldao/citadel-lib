import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export default async (walletId, options) => {
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )

  checkWalletId(walletId)
  const {
    nodeAddress,
    amount,
    type,
    redelegateNodeAddress,
    kt,
    rewardsAddress,
    rewardsRestake,
    additionalFee,
    isWithoutDelegation
  } = options
  checkTypes(
    // Array for polka
    ['nodeAddress', nodeAddress, ['String', 'Array']],
    ['amount', amount, ['String', 'Number']],
    ['type', type, ['String']],
    // Array for polka
    ['redelegateNodeAddress', redelegateNodeAddress, ['String', 'Array']],
    ['kt', kt, ['String']],
    //for polka
    ['rewardsAddress', rewardsAddress, ['String']],
    ['rewardsRestake', rewardsRestake, ['Boolean']],
    ['additionalFee', additionalFee, ['String', 'Number']],
    ['isWithoutDelegation', isWithoutDelegation, ['Boolean']]
  )

  return await walletInstances
    .getWalletInstanceById(walletId)
    .prepareDelegation({
      nodeAddress,
      amount,
      type,
      redelegateNodeAddress,
      kt,
      rewardsAddress,
      rewardsRestake,
      additionalFee,
      isWithoutDelegation
    })
}
