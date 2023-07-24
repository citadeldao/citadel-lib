import { addWallet } from './addWallet'
import { getWalletTransactions } from './getWalletTransactions'
import { getTransactionByHash } from './getTransactionByHash'
import { removeWallet } from './removeWallet'
import { renameWalletTitle } from './renameWalletTitle'
import { getFees } from './getFees'
import { postTransactionNote } from './postTransactionNote'
import { polkadotPrepareRedelegation } from './polkadotPrepareRedelegation'
import { getCrossNetFees } from './getCrossNetFees'


export const wallet = {
  addWallet,
  getCrossNetFees,
  getFees,
  getWalletTransactions,
  getTransactionByHash,
  polkadotPrepareRedelegation,
  postTransactionNote,
  removeWallet,
  renameWalletTitle,
}
