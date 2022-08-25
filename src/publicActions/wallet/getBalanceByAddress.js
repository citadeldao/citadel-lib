import api from '../../api'
import {
  checkTypes,
  checkInitialization,
  checkNetwork,
} from '../../helpers/checkArguments'

/**
 * Get an object with wallet balances by network key and address
 * 
 * @param net STRING (REQUIRED) - wallet network
 * @param address STRING (REQUIRED) - wallet address
 *
 * @returns Returns OBJECT
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getBalanceByAddress(
    'btc',
    '1M5RzUcDqyiK15rGLdrU7JC3KCJEscDkki'
  )

  // =>
  {
    "result": "success",
    "data": {
      "mainBalance": 0.00008097,
      "delegatedBalance": 0,
      "originatedAddresses": [],
      "adding": [],
      "stake": 0,
      "frozenBalance": 0,
      "frozen": [],
      "unstake": 0,
      "calculatedBalance": 0.00008097
    },
    "error": null
  }
 */

export const getBalanceByAddress = async (net, address) => {
  // checks
  checkInitialization()
  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true]
  )
  checkNetwork(net)

  // call api
  const { data } = await api.requests.getDelegationBalance({
    net,
    address,
  })

  return data
}
