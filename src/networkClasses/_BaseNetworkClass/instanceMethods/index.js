import { renameTitle } from './renameTitle'
import { getTransactions } from './getTransactions'
import { getDelegationBalance } from './getDelegationBalance'
import { prepareTransfer } from './prepareTransfer'
import { signAndSend } from './signAndSend'
import { signAndSendMulti } from './signAndSendMulti'
import { signTransaction } from './signTransaction'
import { getTokens } from './getTokens'
import { getTokenActions } from './getTokenActions'
import { prepareTokenAction } from './prepareTokenAction'
import { getTokenInfos } from './getTokenInfos'
import { callTokenInfo } from './callTokenInfo'
import { createMessageSignature } from './createMessageSignature'
import { assignToDao } from './assignToDao'
import { setViewingKey } from './setViewingKey'
import { importViewingKey } from './importViewingKey'
import { getSavedViewingKeys } from './getSavedViewingKeys'
import { checkSavedAndSimpleVKValidity } from './checkSavedAndSimpleVKValidity'
import { convertScrtToSecretScrt } from './convertScrtToSecretScrt'
import { prepareCrossNetworkTransfer } from './prepareCrossNetworkTransfer'
import { getCrossNetworkRoutes } from './getCrossNetworkRoutes'
import { getStakeList } from './getStakeList'
import { getDelegationFee } from './getDelegationFee'
import { prepareDelegation } from './prepareDelegation'
import { prepareClaim } from './prepareClaim'
import { prepareGasPledge } from './prepareGasPledge'
import { prepareGasUnpledge } from './prepareGasUnpledge'
import { getFees } from './getFees'
import { getTransactionURLByHash } from './getTransactionURLByHash'
import { getScannerLinkById } from './getScannerLinkById'
import { deleteViewingKey } from './deleteViewingKey'
import { getUnassignedAddresses } from './getUnassignedAddresses'
import { getKTAddresses } from './getKTAddresses'
import { getDaoRewardsByRange } from './getDaoRewardsByRange'
import { getDaoCalculatorData } from './getDaoCalculatorData'
import { getAllDaoRewards } from './getAllDaoRewards'
// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import { prepareAssignToDaoMessage } from './prepareAssignToDaoMessage'
import { updateSubtokensList } from './updateSubtokensList'
import { signMessage } from './signMessage'
import { polkadotPrepareClaimUnstaked } from './polkadotPrepareClaimUnstaked'
import { executeContract } from './executeContract'
import { loadKeplrSnip20Balances } from './loadKeplrSnip20Balances'
import { executeMessageCollection } from './executeMessageCollection'

export const instanceMethods = {
  renameTitle,
  getTransactions,
  getDelegationBalance,
  prepareTransfer,
  signAndSend,
  signAndSendMulti,
  signTransaction,
  getTokens,
  getTokenActions,
  prepareTokenAction,
  getTokenInfos,
  callTokenInfo,
  createMessageSignature,
  assignToDao,
  setViewingKey,
  importViewingKey,
  getSavedViewingKeys,
  checkSavedAndSimpleVKValidity,
  convertScrtToSecretScrt,
  getCrossNetworkRoutes,
  prepareCrossNetworkTransfer,
  getStakeList,
  getDelegationFee,
  prepareDelegation,
  prepareClaim,
  prepareGasPledge,
  prepareGasUnpledge,
  getFees,
  getTransactionURLByHash,
  getScannerLinkById,
  deleteViewingKey,
  getUnassignedAddresses,
  getKTAddresses,
  getDaoRewardsByRange,
  getDaoCalculatorData,
  getAllDaoRewards,
  prepareAssignToDaoMessage,
  updateSubtokensList,
  signMessage,
  polkadotPrepareClaimUnstaked,
  executeContract,
  loadKeplrSnip20Balances,
  executeMessageCollection
}
