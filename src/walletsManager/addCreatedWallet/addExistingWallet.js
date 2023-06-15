import { updateExistingWallet } from './updateExistingWallet'
import { WALLET_TYPES } from '../../constants'
import errors from '../../errors'

export const addExistingWallet = async ({
  createdWallet,
  existingWallet,
  updateSubtokensList,
}) => {
  // ORDER FOR "oneSeed"
  if (createdWallet.type === WALLET_TYPES.ONE_SEED) {
    // throw error for the same type
    if (existingWallet.type === WALLET_TYPES.ONE_SEED) {
      // throw error for any other wallets
      errors.throwError('WalletListError', {
        message: `Wallet with net: "${createdWallet.net}" and address: "${createdWallet.address}" is already exist. Adding wallet skipped.`,
        code: 0,
      })
    }
    // update existing wallet and private subtokens (secret)
    return updateExistingWallet({
      existingWallet,
      createdWallet,
      updateSubtokensList,
    })
  }

  // ORDER FOR "generatedFromSeed"
  if (createdWallet.type === WALLET_TYPES.SEED_PHRASE) {
    // update existing wallet (type), private subtokens (secret) and return updated wallet
    return updateExistingWallet({
      existingWallet,
      createdWallet,
      updateSubtokensList,
    })
  }

  // ORDER FOR "privateKey"
  if (createdWallet.type === WALLET_TYPES.PRIVATE_KEY) {
    // update existing wallet (type), private subtokens (secret) and return updated wallet
    return updateExistingWallet({
      existingWallet,
      createdWallet,
      updateSubtokensList,
    })
  }

  // ORDER FOR "hardware", "metamask" and "keplr" wallets
  if (
    [
      WALLET_TYPES.LEDGER,
      WALLET_TYPES.TREZOR,
      WALLET_TYPES.KEPLR,
      WALLET_TYPES.METAMASK,
      WALLET_TYPES.WALLET_CONNECT,
    ].includes(createdWallet.type)
  ) {
    if (existingWallet.type === WALLET_TYPES.PUBLIC_KEY) {
      // update existing wallet (type), private subtokens (secret) and return updated wallet
      return updateExistingWallet({
        existingWallet,
        createdWallet,
        updateSubtokensList,
      })
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
