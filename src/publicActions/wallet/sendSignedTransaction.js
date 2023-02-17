import {
    checkTypes,
    checkInitialization,
    checkWalletId,
  } from '../../helpers/checkArguments'
  import walletInstances from '../../walletInstances'

  
  export const sendSignedTransaction = async ( walletId, options = {} ) => {
    // checks
    checkInitialization()
    checkTypes(
        ['walletId', walletId, ['String', 'Number'], true],
        ['options', options, ['Object']]
    )
    checkWalletId(walletId)
    const { signedTransaction, mem_tx_id = null, proxy = false } = options
    checkTypes(
      ['signedTransaction', signedTransaction, ['String'], true],
      ['proxy', proxy, ['Boolean']],
      ['mem_tx_id', mem_tx_id, ['String','Null']]
    )
  
  // call wallet instance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .sendSignedTransaction({ signedTransaction, mem_tx_id, proxy })
}