import {
    checkTypes,
    checkInitialization,
    checkWalletId,
    checkNetworkOrToken,
  } from '../../helpers/checkArguments'
  import walletInstances from '../../walletInstances'
  
  /**
   * Commission calculation for crossnetwork transfer transactions
   * 
   * @param walletId STRING, NUMBER (REQUIRED) - wallet id
   * @param netTo STRING (REQUIRED) - network send to
   * 
   * @returns Returns OBJECT
   * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
   * @example
    const response = await citadel.getCrossNetFees(
      '1235',
      {netTo: 'osmosis'}
    )
  
    // =>
    {
      "result": "success",
      "data": {
        {
            "low": {
                "fee": 0.00023926730769230768,
                "speed": 60,
                "gasPrice": 5000000000
            },
            "high": {
                "fee": 0.00023926730769230768,
                "speed": 10,
                "gasPrice": 5000000000
            },
            "medium": {
                "fee": 0.00023926730769230768,
                "speed": 30,
                "gasPrice": 5000000000
            },
            "highest": {
                "fee": 0.00023926730769230768,
                "speed": 5,
                "gasPrice": 5000000000
            }
        }
      },
      "error": null
    }
   */
  
  export const getCrossNetFees = (walletId, {netTo}) => {
    // checks
    checkInitialization()
    checkTypes(
      ['walletId', walletId, ['String', 'Number'], true],
      ['netTo', netTo, ['String'], true]
    )
    checkWalletId(walletId)
  
    // call walletInstance method
    return walletInstances.getWalletInstanceById(walletId).getCrossNetFees({netTo})
  }