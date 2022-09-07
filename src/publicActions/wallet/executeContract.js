import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../constants'
import walletInstances from '../../walletInstances'

/**
 * Executing secret token contracts
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - Secret wallet id
 * @param options OBJECT (REQUIRED) = {
    privateKey,
    derivationPath,
    contract,
    gas,
    msg,
    sender,
    sent_funds
  }
 * @param options.privateKey STRING (OPTIONAL) wallet private key
 * @param options.derivationPath STRING (OPTIONAL) derivation path for hardware wallet
 * @param options.contract STRING (REQUIRED) contract address
 * @param options.gas STRING (OPTIONAL) gas limit for the transaction. If not defined, then the library will try to calculate it through transaction simulation
 * @param options.msg OBJECT (REQUIRED) message to execute
 * @param options.sender STRING (OPTIONAL) sender address. By default - wallet address, which corresponds to id
 * @param options.sent_funds ARRAY (OPTIONAL) additional argument (to work with derivatives for example)
 * 
 * @param token  STRING (REQUIRED) - the token for which the Viewing Key is being removed
 *
 * @returns Returns ARRAY with transaction hash string (['hexHashString'])
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.executeContract('439769', {
    privateKey:
      'c0e4b57b19c18b21056dd3acad16933ceea1f7564e542dcb3990cc5fbba4b71f',
    proxy: false,
    derivationPath: null,
    sender: 'secret1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n28t2kpq',
    gas: '150000',
    contract: 'secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw',
    msg: {
      transfer: {
        recipient: 'secret1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n28t2kpq',
        amount: '100000000000000',
      },
    },
  })

  // =>
  {
    "result": "success",
    "data": [
        "D32DA7DF1698369CA69921E9195EDD924FF9DC8EE54ADAEF93F72C5A83723487"
    ],
    "error": null
  }
 */

export const executeContract = async (walletId, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['options', options, ['Object'], true]
  )
  checkWalletId(walletId)

  const {
    privateKey,
    derivationPath,
    contract,
    gas,
    msg,
    sender,
    sent_funds: sentFunds,
  } = options

  checkTypes(
    ['contract', contract, ['String'], true],
    ['gas', gas, ['String', 'Number']],
    ['msg', msg, ['Object', 'Array'], true],
    ['sender', sender, ['String']],
    ['sentFunds', sentFunds, ['Array']]
  )

  options.sentFunds = sentFunds

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  // call wallet instance method
  return await walletInstance.executeContract(options)
}
