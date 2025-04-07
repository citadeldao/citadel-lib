import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * prepare custom transaction (claim-stake cosmos etc)
 *
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param data ARRAY (REQUIRED) - array of messages: [
    // claim
    {
      type: 'cosmos-sdk/MsgWithdrawDelegationReward',
      value: {
        delegator_address: string,
        validator_address: string
      }
    }

    // stake
    {
    type: "cosmos-sdk/MsgDelegate",
      value: {
        amount: {
        amount: string,
        denom: string
        },
        delegator_address: string,
        validator_address: string
      }
    }]
 * 
 * @returns Returns object with transaction ans fee
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.buildCustomTransaction(
    '12345',
    data
  )

  // =>
  {
    "result": "success",
    "data": {
      transaction: main transaction
      fee: float
    },
    "error": null
  }
 */

export const buildLiquidStaking = async (walletId, data) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['data', data, ['Object'], true]
  )
  checkWalletId(walletId)

  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .buildLiquidStaking(data)
}
