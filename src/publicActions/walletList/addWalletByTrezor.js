import {
  checkTypes,
  checkInitialization,
  checkNetwork,
} from '../../helpers/checkArguments'
import libCore from '../../libCore'
import networkPublicActions from '../network'

export default async (options) => {
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, derivationPath, title } = options
  checkTypes(['title', title, ['String']])
  checkNetwork(net)

  // generate wallet by privateKey
  const createdWallet = await networkPublicActions.createWalletByTrezor({
    net,
    derivationPath,
  })
  // save derivation path for return
  const createdDerivationPath = createdWallet.derivationPath
  // do not save it to storage
  delete createdWallet.derivationPath

  // add new wallet
  const newWallet = await libCore.addCreatedWallet({ createdWallet, title })
  // return if the wallet has not been added
  if (!newWallet) return
  // return wallet with private key and derivation path
  return {
    ...newWallet,
    derivationPath: createdDerivationPath,
  }
}
