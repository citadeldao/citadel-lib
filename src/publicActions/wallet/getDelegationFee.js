import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Commission calculation for stake, unstake etc transactions
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param options OBJECT (REQUIRED) = { nodeAddress, amount, transactionType, redelegateNodeAddress, kt }
 * @param options.nodeAddress STRING (REQUIRED) - address of the validator node to which funds are delegated
 * @param options.transactionType STRING (REQUIRED) - delegation type: 'stake', 'unstake', or 'redelegate', ('pledge', 'unpledge' for Iost)
 * @param options.sourceNodeAddress STRING (OPTIONAL) - address of the node from which the funds are delegated. Used with type 'redelegate'.
 * @param options.kt STRING (OPTIONAL) - kt-address (for Tezos wallet)
 * 
 * @returns Returns OBJECT
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getDelegationFee(
    '65684',
    nodeAddress: 'akashvaloper1a4zxtnu9k0zpl6p5hmduc5zz7xrm2dz8vm2ey8'
    transactionType: 'stake',
  )

  // =>
  {
    "result": "success",
    "data": {
      "maxAmount": "4.125655",
      "enough": true,
      "fee": 0.049485,
      "adding": {}
    },
    "error": null
  }
 */

export const getDelegationFee = (walletId, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )
  checkWalletId(walletId)

  const {
    transactionType,
    nodeAddress,
    sourceNodeAddress,
    kt,
    isWithoutDelegation,
    newAddingFormat
  } = options

  checkTypes(
    ['transactionType', transactionType, ['String'], true],
    // TODO: Для iost необязательно и есть transfer
    ['nodeAddress', nodeAddress, ['String', 'Null']],
    ['sourceNodeAddress', sourceNodeAddress, ['String']],
    ['kt', kt, ['String']],
    //only for icon
    ['isWithoutDelegation', isWithoutDelegation, ['Boolean']],
    //for networks that have resorces
    ['newAddingFormat', newAddingFormat, ['Boolean']]
  )

  // call walletInstance method
  return walletInstances.getWalletInstanceById(walletId).getDelegationFee({
    transactionType,
    nodeAddress,
    sourceNodeAddress,
    kt,
    isWithoutDelegation,
    newAddingFormat
  })
}
