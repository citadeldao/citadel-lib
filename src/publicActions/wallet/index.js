import renameWalletTitleById from './renameWalletTitleById'
import prepareTransfer from './prepareTransfer'
import getBalanceById from './getBalanceById'
import signTransaction from './signTransaction'
import signAndSend from './signAndSend'
import signAndSendMulti from './signAndSendMulti'
import getTransactionsById from './getTransactionsById'
import getTokenActions from './getTokenActions'
import getTokensById from './getTokensById'
import prepareTokenAction from './prepareTokenAction'
import getTokenInfos from './getTokenInfos'
import callTokenInfo from './callTokenInfo'
import createMessageSignature from './createMessageSignature'
import assignToDao from './assignToDao'
import setViewingKey from './setViewingKey'
import getSavedViewingKeys from './getSavedViewingKeys'
import importViewingKey from './importViewingKey'
import checkSavedAndSimpleVKValidity from './checkSavedAndSimpleVKValidity'
import convertScrtToSecretScrt from './convertScrtToSecretScrt'
import prepareCrossNetworkTransfer from './prepareCrossNetworkTransfer'
import getCrossNetworkRoutes from './getCrossNetworkRoutes'
import getStakeList from './getStakeList'
import getDelegationFee from './getDelegationFee'
import prepareDelegation from './prepareDelegation'
import prepareClaim from './prepareClaim'
import getFees from './getFees'
import getBalanceByAddress from './getBalanceByAddress'
import getTransactionURLByHash from './getTransactionURLByHash'
import getScannerLinkById from './getScannerLinkById'
import deleteViewingKey from './deleteViewingKey'
import getUnassignedAddresses from './getUnassignedAddresses'
import getAssignedAddresses from './getAssignedAddresses'
import prepareGasPledgeUnpledge from './prepareGasPledgeUnpledge'
import getKTAddresses from './getKTAddresses'
import getDaoRewardsByRange from './getDaoRewardsByRange'
import getDaoCalculatorData from './getDaoCalculatorData'
import getAllDaoRewards from './getAllDaoRewards'
// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import prepareAssignToDaoMessage from './prepareAssignToDaoMessage'
import prepareClaimUnstaked from './prepareClaimUnstaked'
import signMessage from './signMessage'

export default {
  renameWalletTitleById,
  prepareTransfer,
  getBalanceById,
  signTransaction,
  signAndSend,
  signAndSendMulti,
  getTransactionsById,
  getTokenActions,
  getTokensById,
  prepareTokenAction,
  getTokenInfos,
  callTokenInfo,
  createMessageSignature,
  assignToDao,
  setViewingKey,
  getSavedViewingKeys,
  importViewingKey,
  checkSavedAndSimpleVKValidity,
  convertScrtToSecretScrt,
  prepareCrossNetworkTransfer,
  getCrossNetworkRoutes,
  getStakeList,
  getDelegationFee,
  prepareDelegation,
  prepareClaim,
  getFees,
  getBalanceByAddress,
  getTransactionURLByHash,
  getScannerLinkById,
  deleteViewingKey,
  getUnassignedAddresses,
  getAssignedAddresses,
  prepareGasPledgeUnpledge,
  getKTAddresses,
  getDaoRewardsByRange,
  getDaoCalculatorData,
  getAllDaoRewards,
  prepareAssignToDaoMessage,
  signMessage,
  prepareClaimUnstaked,
}
