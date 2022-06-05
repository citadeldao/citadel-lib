import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import libCore from '../../libCore'
import networkPublicActions from '../network'

export default async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, derivationPath, title } = options
  checkTypes(['title', title, ['String']])

  const createdWallet = await networkPublicActions.createWalletByLedger({
    net,
    derivationPath,
  })
  // save (formatted) private key for return
  const createdDerivationPath = createdWallet.derivationPath
  // delete private key from createdWallet (do not save it to storage)
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
