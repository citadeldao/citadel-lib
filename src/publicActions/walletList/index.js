import { addWalletByPrivateKey } from './addWalletByPrivateKey'
import { addWalletByMnemonic } from './addWalletByMnemonic'
import { addWalletByLedger } from './addWalletByLedger'
import { removeWalletById } from './removeWalletById'
import { getWalletInfoById } from './getWalletInfoById'
import { getWalletList } from './getWalletList'
import { getActiveDaoHolders } from './getActiveDaoHolders'
import { addWalletByPublicKey } from './addWalletByPublicKey'
import { addWalletCollectionByPublicKey } from './addWalletCollectionByPublicKey'
import { addWalletCollectionByPrivateKey } from './addWalletCollectionByPrivateKey'
import { addWalletCollectionByMnemonic } from './addWalletCollectionByMnemonic'
import { setWalletList } from './setWalletList'
import { addWalletByTrezor } from './addWalletByTrezor'
import { getCustomWalletLists } from './getCustomWalletLists'
import { createCustomWalletList } from './createCustomWalletList'
import { deleteCustomWalletList } from './deleteCustomWalletList'
import { editCustomWalletList } from './editCustomWalletList'
import { addCreatedWallet } from './addCreatedWallet'
import { removeWalletCollectionById } from './removeWalletCollectionById'
import { getAllTokensByNet } from './getAllTokensByNet'
import { getTotalClaimedRewardsXCT } from './getTotalClaimedRewardsXCT'
import { getXctRewards } from './getXctRewards'
import { getEvmAllowance } from './getEvmAllowance'
import { getEvmApprove } from './getEvmApprove'

// Methods for managing the list of wallets. Typically, wrappers over a module WALLETS MANAGER
export const walletList = {
  getAllTokensByNet,
  addWalletByPrivateKey,
  addWalletByMnemonic,
  addWalletByLedger,
  removeWalletById,
  getWalletInfoById,
  getWalletList,
  getActiveDaoHolders,
  addWalletByPublicKey,
  addWalletCollectionByPublicKey,
  addWalletCollectionByPrivateKey,
  addWalletCollectionByMnemonic,
  setWalletList,
  addWalletByTrezor,
  getCustomWalletLists,
  createCustomWalletList,
  deleteCustomWalletList,
  editCustomWalletList,
  addCreatedWallet,
  removeWalletCollectionById,
  getTotalClaimedRewardsXCT,
  getXctRewards,
  getEvmAllowance,
  getEvmApprove,
}
