import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Generates a wallet object (with address, privateKey, publicKey etc) given a private key
 *
 * Note: does not save the wallet and does not add it to the user's account
 * @param options OBJECT (REQUIRED)
 * @param options.net STRING (REQUIRED) - network key
 * @param options.privateKey STRING (REQUIRED) - wallet private key
 * @param options.account STRING (OPTIONAL) - account name for iost wallets
 * @returns Returns OBJECT with wallet info
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.createWalletByPrivateKey({
 *   net: "akash",
 *   privateKey: "c045f2a05787fe519e03d078c059b44a43fa97c4e9c1e5e7ba871b3064da551d"
 * })
 *
 * // =>
 * {
 *  result: 'success',
 *  data: {
 *    net: 'akash',
 *    address: 'akash18dsvetrhz0p23enrwlunvxlshgsrjnzu9l7lpa',
 *    publicKey: '0224cb96c2a379ffdaacaa320fdff74c51407b4cfa33f5748118fc312fe6512b43',
 *    derivationPath: "m/44'/118'/0'/0/0",
 *    privateKey: 'c045f2a05787fe519e03d078c059b44a43fa97c4e9c1e5e7ba871b3064da551d',
 *    type: 'privateKey',
 *    isCosmosNetwork: true,
 *    code: 'AKT',
 *    methods: {
 *      stake: 'multiStake',
 *      claim: true,
 *      bridge: [
 *        'cosmos_akash',
 *        'juno_akash',
 *        'kava_akash',
 *        'osmosis_akash',
 *        'sifchain_akash',
 *      ],
 *    },
 *    networkName: 'Akash',
 *    fee_key: 'fee',
 *  },
 *  error: null,
 *}
 */

export const createWalletByPrivateKey = async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, privateKey, account } = options
  checkTypes(
    ['net', net, ['String'], true],
    ['privateKey', privateKey, ['String'], true],
    ['account', account, ['String']]
  )
  checkNetwork(net)

  // call static network method
  return await networkClasses.getNetworkClass(net).createWalletByPrivateKey({
    privateKey,
    account,
  })
}
