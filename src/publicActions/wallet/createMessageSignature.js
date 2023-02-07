import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

/**
 * Accepts a message and returns a signature for it
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param message OBJECT, STRING (REQUIRED) - signing message
 * @param options OBJECT (REQUIRED) = { privateKey, derivationPath }
 * @param options.amount STRING, NUMBER (REQUIRED) native secret amount to convert
 * @param options.privateKey STRING (OPTIONAL) wallet private key
 * @param options.derivationPath STRING (OPTIONAL) derivation path for hardware (or polkadot) wallet
 * 
 * @returns Returns STRING with message signature
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.signTransaction(
    '12345',
    {
      branch: 'cb9e608a-7c94-4b9a-8894-6d900275fa6d',
      contents: [
        {
          amount: 0,
          destination: 'tz1UC6zikMqMQEiJjX4v5HTJUZwLZsiUvkbz',
          fee: 0,
          gas_limit: 0,
          kind: 'transaction',
          source: 'tz1UC6zikMqMQEiJjX4v5HTJUZwLZsiUvkbz',
          storage_limit: '1',
          counter: '1',
        },
      ],
      protocol: 'PsFLorenaUUuikDWvMDr6fGBRG8kt3e3D3fHoXK1j1BFRxeSH4i',
    },
    {
      privateKey: 'edskRsUoQDwKcc6kE1B24r9CBHb89e4N19nq27eCb2quztGWdqrYJjwBRDBJUyKwJXYRE5dS5miJrhr8tdK6gtWnpWdTjbrK6t'
    }
  )

  // =>
  {
    "result": "success",
    "data": "6c3ea71b01fb1d1e30da8f22ac991cd1658ad0c29030a935ccfd87484773fcfaec67e18a38e682f161d940e5eef4433778841ae26728229262c2625e2bdc360b",
    "error": null
  }
 */

export const createMessageSignature = async (
  walletId,
  message,
  { privateKey, derivationPath, useAlternativeSigner }
) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['message', message, ['String', 'Object'], true],
    ['privateKey', privateKey, ['String'], true],
    ['useAlternativeSigner', useAlternativeSigner, ['Boolean']]
  )
  
  checkWalletId(walletId)

  // call walletInstance method
  return await walletInstances
    .getWalletInstanceById(walletId)
    .createMessageSignature(message, {
      privateKey,
      derivationPath,
      useAlternativeSigner
    })
}
