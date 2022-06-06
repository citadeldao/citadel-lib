import storage from '../storage'

// return walletList Array
export const getWalletList = () =>
  Object.values(storage.wallets.getWalletListObject())
