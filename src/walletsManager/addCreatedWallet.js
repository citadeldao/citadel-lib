import { retryRequestOnError } from '../helpers/retryRequestOnError.js'
import api from '../api'
import storage from '../storage'
import { SECRET_NET_KEY, WALLET_TYPES } from '../constants'
import { getWalletInfoByAddress } from './getWalletInfoByAddress'
import { getWalletInfoById } from './getWalletInfoById'
import { updateWallet } from './updateWallet'
import walletInstances from '../walletInstances'
import state from '../state.js'
import errors from '../errors/index.js'

// It is expected that the wallet was previously created by one of the 'create...' lib methods
// network config fields already added in create method: code, networkName etc
export const addCreatedWallet = async ({
  createdWallet,
  title = '',
  checkExistence = true,
  // for add wallet from account list (info / detail), then createdWallet already has balance, title and id
  addToAccount = true,
  loadBalance = true,
  updateSubtokensList = true,
}) => {
  // CHECK EXISTENCE
  const existingWallet = getWalletInfoByAddress(
    createdWallet.net,
    createdWallet.address
  )
  if (checkExistence && existingWallet) {
    // ORDER FOR "oneSeed"
    if (createdWallet.type === WALLET_TYPES.ONE_SEED) {
      // skip add for the same type
      if (existingWallet.type === WALLET_TYPES.ONE_SEED) {
        // throw error for any other wallets
        errors.throwError('WalletListError', {
          message: `Wallet with net: "${createdWallet.net}" and address: "${createdWallet.address}" is already exist. Adding wallet skipped.`,
          code: 0,
        })
      }
      // rewrite any others types and return updated wallet
      return updateWallet({
        walletId: existingWallet.id,
        newWalletInfo: createdWallet,
      })
    }

    // ORDER FOR "privateKey"
    if (createdWallet.type === WALLET_TYPES.PRIVATE_KEY) {
      // rewrite any others types and return updated wallet
      return updateWallet({
        walletId: existingWallet.id,
        newWalletInfo: createdWallet,
      })
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
        // rewrite any others types and return updated wallet
        const updatedWallet = updateWallet({
          walletId: existingWallet.id,
          newWalletInfo: createdWallet,
        })
        // update subtokens for secret wallet
        existingWallet.net === SECRET_NET_KEY &&
          (await walletInstances
            .getWalletInstanceById(existingWallet.id)
            .updateSubtokensList())

        return updatedWallet
      }
      // throw error for any other wallets
      errors.throwError('WalletListError', {
        message: `Wallet with net: "${createdWallet.net}" and address: "${createdWallet.address}" is already exist. Adding wallet skipped.`,
        code: 0,
      })
    }

    // ORDER FOR publicKey
    if (createdWallet.type === WALLET_TYPES.PUBLIC_KEY) {
      // throw error for any other wallets
      errors.throwError('WalletListError', {
        message: `Wallet with net: "${createdWallet.net}" and address: "${createdWallet.address}" is already exist. Adding wallet skipped.`,
        code: 0,
      })
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

  // LOAD BALANCE (not for extension)
  if (!state.getState('isExtension') && loadBalance) {
    // load balance
    try {
      const { data: balance } = await api.requests.getDelegationBalance({
        net: createdWallet.net,
        address: createdWallet.address,
      })
      // set balance
      createdWallet.balance = balance
    } catch {
      // set balance to 0
      createdWallet.balance = {
        mainBalance: 0,
        calculatedBalance: 0,
      }
    }
  }

  // ADD TO STORAGE WALLET LIST
  storage.wallets.putWallet(createdWallet)

  // CREATE WALLET INSTANCE
  walletInstances.createWalletInstance(createdWallet)

  // SET SUBTOKEN LIST
  if (!state.getState('isExtension') && updateSubtokensList) {
    await walletInstances
      .getWalletInstanceById(createdWallet.id)
      .updateSubtokensList()
  }

  // get wallet from storage (with subtokesList)
  const newWallet = getWalletInfoById(createdWallet.id)

  return newWallet
}
