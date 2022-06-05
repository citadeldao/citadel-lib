import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import libCore from '../../libCore'

export default async (wallet) => {
  checkInitialization()
  checkTypes(['wallet', wallet, ['Object'], true])
  // only significant fields
  const {
    net,
    address,
    title,
    publicKey,
    type,
    privateKeyHash,
    privateKey,
    derivationPath,
    // ! created wallet should already contain network config fields
    code,
    fee_key,
    isCosmosNetwork,
    methods,
    networkName,
    bridges,
  } = wallet

  checkTypes(
    ['net', net, ['String'], true],
    ['address', address, ['String'], true],
    ['title', title, ['String']],
    ['type', type, ['String'], true],
    ['publicKey', publicKey, ['String', 'Null']],
    ['privateKeyHash', privateKeyHash, ['String', 'Null']],
    ['privateKey', privateKey, ['String', 'Null']],
    ['derivationPath', derivationPath, ['String', 'Null']]
  )

  const createdWallet = {
    net,
    address,
    title,
    publicKey,
    type,
    privateKeyHash,
    code,
    fee_key,
    isCosmosNetwork,
    methods,
    networkName,
    bridges,
  }

  // add new wallet
  const newWallet = await libCore.addCreatedWallet({ createdWallet, title })

  if (newWallet) {
    // return wallet with private key and derivation path
    return {
      ...newWallet,
      // return privateKey and derivationPath if they were
      ...(privateKey && { privateKey }),
      ...(derivationPath && { derivationPath }),
    }
  }

  return null
}
