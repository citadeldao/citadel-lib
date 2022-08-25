import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get an array with user wallets that are assigned to a given bsc address
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - BSC wallet id
 *
 * @returns Returns ARRAY with wallets info
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getAssignedAddresses('224419')

  // =>
  {
    result: 'success',
    data: [
      {
        net: 'bitsong',
        address: 'bitsong18gmdlx3622d5y3w32ph5pvh0deykjflkm95xv7',
        publicKey:
          '02da64f8f91f96ea14e32b6dbf737de9670e945aacf327ab62fa5c6a0f2d0fc4a9',
        type: 'privateKey',
        id: '228599',
        title: '',
        claimedRewards: 0.000656,
        countTransactions: '84',
        balance: {
          frozenBalance: 0,
          mainBalance: 0.766556,
          stake: 0.11,
          calculatedBalance: 0.876556,
        },
        code: 'BTSG',
        networkName: 'Bitsong',
        methods: {
          stake: 'multiStake',
          claim: true,
          bridge: ['cosmos_bitsong', 'juno_bitsong', 'osmosis_bitsong'],
        },
        fee_key: 'fee',
        isCosmosNetwork: true,
        subtokensList: [],
        subtokenBalanceUSD: 0.15609503726419,
        assignedTo: '0x8abbd7f37ab7c68971f6fc82db050f3c0507967d',
      },
      //...
    ],
    error: null,
  }
 */

export const getAssignedAddresses = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .getAssignedAddresses()
}
