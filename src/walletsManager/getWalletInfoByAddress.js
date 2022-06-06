import { getWalletList } from './getWalletList'

export const getWalletInfoByAddress = (net, address) =>
  getWalletList().find(
    ({ net: walletNet, address: walletAddress }) =>
      walletNet === net && walletAddress === address
  )
