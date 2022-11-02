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
    const response = citadel.getRewardsById('175748')
  
    // =>
    {
      "result": "success",
      "data": {
            "list": [
                {
                    "validator": "cosmosvaloper1gxju9ky3hwxvqqagrl3dxtl49kjpxq6wlqe6m5",
                    "reward": "0.00234781750910418179"
                },
                {
                    "validator": "cosmosvaloper1wukx88lfn7l4gfmrgsy96h6kf5tvrv3ucg502l",
                    "reward": "0"
                },
                {
                    "validator": "cosmosvaloper1n9juyach9xvnsnkeale4kc4kjgaedvsape5vf3",
                    "reward": "0"
                },
                {
                    "validator": "cosmosvaloper1m73mgwn3cm2e8x9a9axa0kw8nqz8a492ms63vn",
                    "reward": "6.70305e-15"
                },
                {
                    "validator": "cosmosvaloper1lzhlnpahvznwfv4jmay2tgaha5kmz5qxerarrl",
                    "reward": "0.00008120883440879459"
                }
            ],
            "total": [
                {
                    "denom": "uatom",
                    "amount": "0.00242902634351967943"
                }
            ]
        },
      "error": null
    }
   */
  
  export const getRewardsById = (walletId) => {
    // checks
    checkInitialization()
    checkTypes(['walletId', walletId, ['String', 'Number'], true])
    checkWalletId(walletId)
  
    // call walletInstance method
    return walletInstances.getWalletInstanceById(walletId).getRewardsById()
  }