import networks from '../../networks'

import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'
import errors from '../../errors'
//import { WALLET_TYPES } from '../../constants'

export default async (options) => {
  checkInitialization()
  checkTypes(
    ['options', options, ['Object'], true],
    ['net', options.net, ['String'], true]
  )
  checkNetwork(options.net)
  const networkClass = networks.getNetworkClass(options.net)
  const {
    mnemonic,
    derivationPath = networkClass.getDerivationPathByIndex(),
    passphrase,
    account,
  } = options
  checkTypes(
    ['mnemonic', mnemonic, ['String'], true],
    ['derivationPath', derivationPath, ['String']],
    ['passphrase', passphrase, ['String']],
    ['account', account, ['String']]
  )
  if (!mnemonic.trim().length) {
    errors.throwError('WrongArguments', {
      message: `Mnemonic phrase is empty`,
    })
  }
  const mnemonicLength = mnemonic.split(' ').length
  if (mnemonicLength % 3 !== 0 || mnemonicLength < 12 || mnemonicLength > 24) {
    errors.throwError('WrongArguments', {
      message: `Length must be between 12 and 24, a multiple of 3. Got '${length}'`,
    })
  }

  return await networkClass.createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase,
    account,
  })
}
