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
 * Executes complex (composite) secret token transactions
 * 
 * @param walletId STRING, NUMBER (REQUIRED) - Secret wallet id
 * @param messages ARRAY (REQUIRED) array of transaction messages. Model:
    [{
      sender,
      contract,
      codeHash, // optional but way faster
      msg,
      sentFunds, // optional
    }]
 * @param options OBJECT (REQUIRED) = {
      privateKey,
      derivationPath,
    }
 * @param options.privateKey STRING (OPTIONAL) wallet private key
 * @param options.derivationPath STRING (OPTIONAL) derivation path for hardware wallet
 *
 * @returns Returns ARRAY with transaction hash string (['hexHashString'])
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.executeContract('439769', 
    [{
      sender: 'secret1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n28t2kpq',
      gas: '150000',
      contract: 'secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw',
      msg: {
        transfer: {
          recipient: 'secret1ytpnwlvz69z7u8rd4yqa8dxr33ygl7n28t2kpq',
          amount: '100000000000000',
        },
      },
    }],
    {
      privateKey: 'c0e4b57b19c18b21056dd3acad16933ceea1f7564e542dcb3990cc5fbba4b71f',
      derivationPath: null,
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

export const executeMessageCollection = async (walletId, messages, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['messages', messages, ['Array'], true],
    ['options', options, ['Object'], true]
  )
  checkWalletId(walletId)

  const { privateKey, derivationPath } = options

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['derivationPath', derivationPath, ['String'], true])
  }
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(walletInstance.type)) {
    checkTypes(['privateKey', privateKey, ['String'], true])
  }

  // call wallet instance method
  return await walletInstance.executeMessageCollection(messages, options)
}
