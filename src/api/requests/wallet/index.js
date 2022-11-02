import { addWallet } from './addWallet'
import { getDelegationBalance } from './getDelegationBalance'
import { getWalletTransactions } from './getWalletTransactions'
import { prepareTransfer } from './prepareTransfer'
import { removeWallet } from './removeWallet'
import { renameWalletTitle } from './renameWalletTitle'
import { sendSignedTransaction } from './sendSignedTransaction'
import { buildBridge } from './buildBridge'
import { getStakeList } from './getStakeList'
import { getDelegationFee } from './getDelegationFee'
import { prepareDelegation } from './prepareDelegation'
import { prepareDelegations } from './prepareDelegations'
import { prepareRedelegation } from './prepareRedelegation'
import { prepareClaim } from './prepareClaim'
import { prepareGasPledge } from './prepareGasPledge'
import { prepareGasUnpledge } from './prepareGasUnpledge'
import { getFees } from './getFees'
import { checkTransaction } from './checkTransaction'
import { faucetSignUp } from './faucetSignUp'
import { postTransactionNote } from './postTransactionNote'
import { polkadotPrepareStakeAndNominate } from './polkadotPrepareStakeAndNominate'
import { polkadotListOfValidators } from './polkadotListOfValidators'
import { polkadotPrepareUnstake } from './polkadotPrepareUnstake'
import { polkadotPrepareClaimUnstaked } from './polkadotPrepareClaimUnstaked'
import { polkadotSignAndSend } from './polkadotSignAndSend'
import { polkadotPrepareRedelegation } from './polkadotPrepareRedelegation'
import { prepareStakeWithoutDelegation } from './prepareStakeWithoutDelegation'
import { prepareUnstakeWithoutDelegation } from './prepareUnstakeWithoutDelegation'
import { buildCustomTransaction } from './buildCustomTransaction'
import { getWalletRewards } from './getWalletRewards'
import { getRedelegationUnlockDate } from './getRedelegationUnlockDate'


export const wallet = {
  addWallet,
  getDelegationBalance,
  getWalletTransactions,
  prepareTransfer,
  removeWallet,
  renameWalletTitle,
  sendSignedTransaction,
  buildBridge,
  getStakeList,
  getDelegationFee,
  prepareDelegation,
  prepareDelegations,
  prepareRedelegation,
  prepareClaim,
  prepareGasPledge,
  prepareGasUnpledge,
  getFees,
  checkTransaction,
  faucetSignUp,
  postTransactionNote,
  polkadotPrepareStakeAndNominate,
  polkadotListOfValidators,
  polkadotPrepareUnstake,
  polkadotPrepareClaimUnstaked,
  polkadotSignAndSend,
  polkadotPrepareRedelegation,
  prepareStakeWithoutDelegation,
  prepareUnstakeWithoutDelegation,
  buildCustomTransaction,
  getWalletRewards,
  getRedelegationUnlockDate
}
