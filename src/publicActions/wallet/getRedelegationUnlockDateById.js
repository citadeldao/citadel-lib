import {
    checkTypes,
    checkInitialization,
    checkWalletId,
  } from '../../helpers/checkArguments'
  import walletInstances from '../../walletInstances'
  
  /**
   * get wallet rewards list with validators and total
   * 
   * @param walletId STRING, NUMBER (REQUIRED) - wallet id
   * 
   * @returns Returns OBJECT
   * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
   * @example
    const response = citadel.getRedelegationUnlockDateById('175748')
  
    // =>
    {
      "result": "success",
      "data": ,
      "error": null
    }
   */
  
  export const getRedelegationUnlockDateById = (walletId) => {
    // checks
    checkInitialization()
    checkTypes(['walletId', walletId, ['String', 'Number'], true])
    checkWalletId(walletId)
  
    // call walletInstance method
    return walletInstances.getWalletInstanceById(walletId).getRedelegationUnlockDateById()
  }