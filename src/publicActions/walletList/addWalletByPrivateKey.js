import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import libCore from '../../libCore'
import networkPublicActions from '../network'

export default async (options) => {
  // checks
  checkInitialization()
  checkTypes(['options', options, ['Object'], true])
  const { net, privateKey, title, account } = options
  checkTypes(['title', title, ['String']])

  // generate wallet by privateKey
  const createdWallet = await networkPublicActions.createWalletByPrivateKey({
    net,
    privateKey,
    account,
  })

  // save (formatted) private key for return
  const createdPrivateKey = createdWallet.privateKey
  // delete private key from createdWallet (do not save it to storage)
  delete createdWallet.privateKey

  // add new wallet
  const newWallet = await libCore.addCreatedWallet({ createdWallet, title })
  // return if the wallet has not been added
  if (!newWallet) return
  // return wallet with private key
  return { ...newWallet, privateKey: createdPrivateKey }
}
