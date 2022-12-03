import {
    checkTypes,
    checkInitialization,
    checkWalletId,
  } from '../../helpers/checkArguments'
  import walletInstances from '../../walletInstances'
  
  /**
   * returns info for vk (balance,token info,tx history)
   * 
   * @param walletId STRING, NUMBER (REQUIRED) - Secret wallet id
   * @param options OBJECT (REQUIRED) = {
      contractAddress,
      query
    }
   * @param options.contractAddress STRING (REQUIRED) contract address
   * @param options.query OBJECT (REQUIRED) query that we need to get(token info,balance, tx history...)
   *
   * @returns Returns secretjs response for query that we want to read
   * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
   * @example
    const response = await citadel.queryContract('439769', {
      contractAddress: secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps,
      // for tx history
      query: {
         transfer_history: {
          address,
          key: viewingKey,
          page,
          page_size: pageSize,
        },
      }
    })
  
    // =>
    {
      "result": "success",
      "data": qury info(its structure depend on query),
      "error": null
    }
   */
  
  export const queryContract = async (walletId, options) => {
    // checks
    checkInitialization()
    checkTypes(
      ['walletId', walletId, ['String', 'Number'], true],
      ['options', options, ['Object'], true]
    )
    checkWalletId(walletId)
  
    const {
        contractAddress,
        query
    } = options
  
    checkTypes(
      ['contractAddress', contractAddress, ['String'], true],
      ['query', query, ['Object', 'Array'], true],
    )
  
    const walletInstance = walletInstances.getWalletInstanceById(walletId)
  
  
    // call wallet instance method
    return await walletInstance.queryContract(options)
  }