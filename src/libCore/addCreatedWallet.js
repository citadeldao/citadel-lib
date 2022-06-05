import formattedApi from './formattedApi'
import retryRequestOnError from '../helpers/retryRequestOnError.js'
import api from '../api'
import storage from '../storage'
import { WALLET_TYPES } from '../constants'
import walletInstances from '../walletInstances'

// ! created wallet should already contain network config fields: code, fee_key, isCosmosNetwork, methods, networkName, bridges
export default async ({
  createdWallet,
  title = '',
  checkExistence = true,
  // for add wallet from account list (info / detail), then createdWallet already has balance, title and id
  addToAccount = true,
  loadBalance = true,
}) => {
  // CHECK EXISTENCE
  const existingWallet = storage.wallets.getWalletByAddress(
    createdWallet.net,
    createdWallet.address
  )
  if (checkExistence && existingWallet) {
    // ORDER FOR "oneSeed"
    if (createdWallet.type === WALLET_TYPES.ONE_SEED) {
      // skip add for the same type
      if (existingWallet.type === WALLET_TYPES.ONE_SEED) {
        console.warn(
          `Wallet with net: "${createdWallet.net}" and address: "${createdWallet.address}" is already exist. Adding wallet skipped.`
        )
        return
      }
      // rewrite any others types
      return rewriteWalletInfo(createdWallet, existingWallet)
    }

    // ORDER FOR "privateKey"
    if (createdWallet.type === WALLET_TYPES.PRIVATE_KEY) {
      // rewrite any types
      return rewriteWalletInfo(createdWallet, existingWallet)
    }

    // ORDER FOR "hardware", "metamask" and "keplr" wallets
    if (
      [
        WALLET_TYPES.LEDGER,
        WALLET_TYPES.TREZOR,
        WALLET_TYPES.KEPLR,
        WALLET_TYPES.METAMASK,
      ].includes(createdWallet.type)
    ) {
      if (existingWallet.type === WALLET_TYPES.PUBLIC_KEY) {
        // rewrite publicKey type
        return rewriteWalletInfo(createdWallet, existingWallet)
      }
      // skip any other walles
      console.warn(
        `Wallet with net: "${createdWallet.net}" and address: "${createdWallet.address}" is already exist. Adding wallet skipped.`
      )
      return
    }

    // ORDER FOR publicKey
    if (createdWallet.type === WALLET_TYPES.PUBLIC_KEY) {
      // skip add for any types
      console.warn(
        `Wallet with net: "${createdWallet.net}" and address: "${createdWallet.address}" is already exist. Adding wallet skipped.`
      )
      return
    }
  }
  // ADD WALLET TO ACCOUNT
  if (addToAccount) {
    const { data: id } = await retryRequestOnError(
      () =>
        api.requests.addWallet({
          net: createdWallet.net,
          address: createdWallet.address,
          title,
        }),
      { retryDelay: 2000, retryCount: 1 }
    )
    // set walletId
    createdWallet.id = id
    // set title
    createdWallet.title = title
  }
  // LOAD BALANCE
  if (loadBalance) {
    // load balance
    const { data: balance } = await formattedApi.getDelegationBalance({
      net: createdWallet.net,
      address: createdWallet.address,
    })
    // set balance
    createdWallet.balance = balance
  }
  // ADD TO STORAGE WALLET LIST AND CREATE INSTANCE
  storage.wallets.putWallet(createdWallet)

  // SET SUBTOKEN LIST
  await walletInstances
    .getWalletInstanceById(createdWallet.id)
    .updateSubtokensList()

  // get wallet from storage (with subtokesList)
  const newWallet = storage.wallets.getWalletById(createdWallet.id)

  return newWallet
}

const rewriteWalletInfo = (createdWallet, existingWallet) => {
  // rewrite any types
  const updatedWallet = storage.wallets.updateWallet({
    walletId: existingWallet.id,
    newWalletInfo: createdWallet,
  })

  // init instance (check VK and calc secret token balance etc)
  walletInstances.getWalletInstanceById(existingWallet.id).init()
  // return updated wallet with private key
  return updatedWallet
}
