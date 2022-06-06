import storage from '../storage'

export const getWalletInfoById = (id) =>
  storage.wallets.getWalletListObject()[id]
