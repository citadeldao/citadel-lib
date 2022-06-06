import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Generates a wallet object (with address, publicKey etc) via the Ledger device
 *
 * Note: Method does not save the wallet and does not add it to the user's account
 * @param options OBJECT (REQUIRED)
 * @param options.net STRING (REQUIRED) - network key
 * @param options.derivationPath STRING (OPTIONAL) - derivation path, by default, a zero path is set according to the template of this network
 * @returns Returns OBJECT with wallet info
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.createWalletByLedger({
 *   net: 'btc',
 *   derivationPath: "44'/0'/0'/0/1"
 * })
 *
 * // =>
 * {
 *  result: 'success',
 *  data: {
 *    address: '1Ma6vMCyK4v3EdoVV8NPC8s3bCA36RzoPH',
 *    publicKey: '02bf2f99f1dd15cb9f5d6d8fcf525424e9f5b714852d4c54ff886a1d82ded8e685',
 *    derivationPath: "m/44'/0'/0'/0/1",
 *    privateKey: 'L1C43tZSra82ooJdN9JU9ckjmjMqSFcfDsMzwwmAmkuemqvdiTAq',
 *    type: 'ledger',
 *    code: 'BTC',
 *    decimals: '8',
 *    networkName: 'Bitcoin',
 *    net: 'btc',
 *    validating: '^(1|3|bc1)([a-zA-Z0-9]{23,39})$',
 *    methods: {
 *      exchange: true,
 *      buy: true,
 *    },
 *    fee_key: 'fee',
 *  },
 *  error: null,
 *}
 */

export const createWalletByLedger = async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const networkClass = networkClasses.getNetworkClass(options.net)
  const {
    net,
    derivationPath = networkClass.getDerivationPathByIndex('ledger'),
  } = options

  checkTypes(
    ['net', net, ['String'], true],
    ['derivationPath', derivationPath, ['String']]
  )

  checkNetwork(net)

  // call static network method
  return await networkClass.createWalletByLedger({
    derivationPath,
  })
}
