import networkClasses from '../../networkClasses'

import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'
import errors from '../../errors'

/**
 * Generates a wallet object (with address, privateKey, publicKey etc) given a mnemonic phrase
 *
 * Note: Method does not save the wallet and does not add it to the user's account
 * @param options OBJECT (REQUIRED)
 * @param options.net STRING (REQUIRED) - network key
 * @param options.mnemonic STRING (REQUIRED) - mnemonic phrasse
 * @param options.derivationPath STRING (OPTIONAL) - derivation path, by default, a zero path is set according to the template of this network
 * @param options.passphrase STRING (OPTIONAL) - additional passphrase
 * @param options.account STRING (OPTIONAL) - account name for iost wallets
 * @param options.oneSeed BOOLEAN (OPTIONAL) - if true, created wallet type is "oneSeed", if false - walletType is "generatedFromSeed". Default - true ("oneSeed" type)
 * @returns Returns OBJECT with wallet info
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.createWalletByMnemonic({
 *   "net": "akash",
 *   "mnemonic": "reflect sign door eager cook inject scale eagle original harvest stomach game"
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
 *    type: 'oneSeed',
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

export const createWalletByMnemonic = async (options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['options', options, ['Object'], true],
    ['net', options.net, ['String'], true]
  )
  checkNetwork(options.net)
  const networkClass = networkClasses.getNetworkClass(options.net)
  const {
    mnemonic,
    // set default (zero) derivationPath
    derivationPath = networkClass.getDerivationPathByIndex(),
    passphrase,
    account,
    oneSeed,
  } = options
  checkTypes(
    ['mnemonic', mnemonic, ['String'], true],
    ['derivationPath', derivationPath, ['String']],
    ['passphrase', passphrase, ['String']],
    ['account', account, ['String']],
    ['oneSeed', oneSeed, ['Boolean']]
  )
  if (!mnemonic.trim().length) {
    errors.throwError('WrongArguments', {
      message: `Mnemonic phrase is empty`,
    })
  }
  // word count check
  const mnemonicLength = mnemonic.split(' ').length
  if (mnemonicLength % 3 !== 0 || mnemonicLength < 12 || mnemonicLength > 24) {
    errors.throwError('WrongArguments', {
      message: `Length must be between 12 and 24, a multiple of 3. Got '${length}'`,
    })
  }

  // call static network method
  return await networkClass.createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase,
    account,
    oneSeed,
  })
}
