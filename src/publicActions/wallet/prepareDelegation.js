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
    redelegateNodeAddresses,
    kt,
    rewardsAddress,
    rewardsRestake,
    additionalFee,
    isWithoutDelegation,
    stakeAccount,
    btcAccount,
  } = options
  checkTypes(
    // nodeAddress - Array for polkadot
    ['nodeAddresses', nodeAddresses, ['Array']],
    ['amount', amount, ['String', 'Number']],
    ['type', type, ['String']],
    // Array for polkadot
    ['redelegateNodeAddresses', redelegateNodeAddresses, ['Array']],
    ['kt', kt, ['String']],
    ['rewardsAddress', rewardsAddress, ['String']],
    ['rewardsRestake', rewardsRestake, ['Boolean']],
    ['additionalFee', additionalFee, ['String', 'Number']],
    ['isWithoutDelegation', isWithoutDelegation, ['Boolean']],
    ['stakeAccount', stakeAccount, ['String', null]],
    ['btcAccount', btcAccount, ['String', null]],
  )

  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .prepareDelegation({
      nodeAddresses,
      amount,
      type,
      redelegateNodeAddresses,
      kt,
      // for polkadot
      rewardsAddress,
      rewardsRestake,
      additionalFee,
      isWithoutDelegation,
      stakeAccount,
      btcAccount,
    })
}
