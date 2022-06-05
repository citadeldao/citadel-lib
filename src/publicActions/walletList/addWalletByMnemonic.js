import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import libCore from '../../libCore'
import networkPublicActions from '../network'

export default async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, mnemonic, derivationPath, title, passphrase, account } = options
  checkTypes(['title', title, ['String']])

  // generate wallet by privateKey
  const createdWallet = await networkPublicActions.createWalletByMnemonic({
    net,
    mnemonic,
    derivationPath,
    passphrase,
    account,
  })
  // save privateKey, derivation and mnemonic path for return
  const createdPrivateKey = createdWallet.privateKey
  const createdDerivationPath = createdWallet.derivationPath
  const createdMnemonic = createdWallet.mnemonic
  // do not save it to storage
  delete createdWallet.privateKey
  delete createdWallet.derivationPath
  // for polka dot
  delete createdWallet.mnemonic

  // add new wallet
  const newWallet = await libCore.addCreatedWallet({ createdWallet, title })
  // return if the wallet has not been added
  if (!newWallet) return
  // return wallet with private key and derivation path
  return {
    ...newWallet,
    privateKey: createdPrivateKey,
    derivationPath: createdDerivationPath,
    mnemonic: createdMnemonic,
  }
}
