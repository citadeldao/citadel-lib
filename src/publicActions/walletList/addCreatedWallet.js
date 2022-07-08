import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import walletsManager from '../../walletsManager'
import { dispatchLibEvent } from '../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../constants'

export const addCreatedWallet = async (wallet) => {
  checkInitialization()
  checkTypes(['wallet', wallet, ['Object'], true])
  // get only important properties
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
    // no private properties for save (remove privateKey and derivationPath)!
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
  const newWallet = await walletsManager.addCreatedWallet({
    createdWallet,
    // TODO: refact "title" argument (why separate?)
    title,
  })

  if (newWallet) {
    // EVENT: inform the client that it is time to update wallet list
    dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

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
