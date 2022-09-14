import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Get a list of kt addresses with balances
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * 
 * @returns Returns ARRAY
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.getKTAddresses('12345')

  // =>
  {
    result: 'success',
    data: [
      {
        kind: 'delegator_contract',
        address: 'KT1G2vBmscnzZK82z2bB8gY7Pt5h3oqymFPY',
        balance: {
          mainBalance: 0.009,
          stake: 0.009,
          frozenBalance: 0,
          calculatedBalance: 0.009,
        },
        delegate: {
          alias: 'Coinhouse',
          address: 'tz1dbfppLAAxXZNtf2SDps7rch3qfUznKSoK',
          active: true,
        },
        creationLevel: 1910216,
        creationTime: '2021-12-01T16:23:54Z',
      },
      {
        kind: 'delegator_contract',
        address: 'KT1SsgRQcewUq7stsK3WNSjGLDM6E9HdbYnY',
        balance: {
          mainBalance: 0.01,
          stake: 0.01,
          frozenBalance: 0,
          calculatedBalance: 0.01,
        },
        delegate: {
          alias: 'P2P Validator',
          address: 'tz1P2Po7YM526ughEsRbY4oR9zaUPDZjxFrb',
          active: true,
        },
        creationLevel: 1910207,
        creationTime: '2021-12-01T16:19:24Z',
      },
    ],
    error: null,
  }
 */

export const getKTAddresses = (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  // call walletInstance method
  return walletInstances.getWalletInstanceById(walletId).getKTAddresses()
}
