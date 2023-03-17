import {
    checkTypes,
    checkInitialization,
    checkWalletId,
  } from '../../helpers/checkArguments'
  import walletInstances from '../../walletInstances'
  
  export const getTransactionByHash = async (walletId, options = {}) => {
    // checks
    checkInitialization()
    checkTypes(
      ['walletId', walletId, ['String', 'Number'], true],
      ['options', options, ['Object']]
    )
    checkWalletId(walletId)
  
    const { hash } = options
    checkTypes(
      ['hash', hash, ['String'], true]
    )
  
    const walletInstance = walletInstances.getWalletInstanceById(walletId)
  
   
    return await walletInstance.getTransactionByHash({hash})
  }
  