import { addWallet } from './addWallet'
import { getWalletTransactions } from './getWalletTransactions'
import { removeWallet } from './removeWallet'
import { renameWalletTitle } from './renameWalletTitle'
import { prepareDelegations } from './prepareDelegations'
import { getFees } from './getFees'
import { postTransactionNote } from './postTransactionNote'
import { polkadotPrepareRedelegation } from './polkadotPrepareRedelegation'
import { getCrossNetFees } from './getCrossNetFees'

// import { getDelegationBalance } from './getDelegationBalance'
// import { prepareTransfer } from './prepareTransfer'
// import { sendSignedTransaction } from './sendSignedTransaction'
// import { buildBridge } from './buildBridge'
// import { getStakeList } from './getStakeList'
// import { getDelegationFee } from './getDelegationFee'
// import { prepareDelegation } from './prepareDelegation'
// import { prepareRedelegation } from './prepareRedelegation'
// import { prepareClaim } from './prepareClaim'
// import { prepareGasPledge } from './prepareGasPledge'
// import { prepareGasUnpledge } from './prepareGasUnpledge'
// import { checkTransaction } from './checkTransaction'
// import { faucetSignUp } from './faucetSignUp'
// import { polkadotPrepareStakeAndNominate } from './polkadotPrepareStakeAndNominate'
// import { polkadotListOfValidators } from './polkadotListOfValidators'
// import { polkadotPrepareUnstake } from './polkadotPrepareUnstake'
// import { polkadotPrepareClaimUnstaked } from './polkadotPrepareClaimUnstaked'
// import { polkadotSignAndSend } from './polkadotSignAndSend'
// import { prepareStakeWithoutDelegation } from './prepareStakeWithoutDelegation'
// import { prepareUnstakeWithoutDelegation } from './prepareUnstakeWithoutDelegation'
// import { buildCustomTransaction } from './buildCustomTransaction'
// import { getWalletRewards } from './getWalletRewards'
// import { getRedelegationUnlockDate } from './getRedelegationUnlockDate'


export const wallet = {
  addWallet,
  getCrossNetFees,
  getFees,
  getWalletTransactions,
  polkadotPrepareRedelegation,
  postTransactionNote,
  prepareDelegations,
  removeWallet,
  renameWalletTitle,

  // getDelegationBalance,
  // prepareTransfer,
  // sendSignedTransaction,
  // buildBridge,
  // getStakeList,
  // getDelegationFee,
  // prepareDelegation,
  // prepareRedelegation,
  // prepareClaim,
  // prepareGasPledge,
  // prepareGasUnpledge,
  // checkTransaction,
  // faucetSignUp,
  // polkadotPrepareStakeAndNominate,
  // polkadotListOfValidators,
  // polkadotPrepareUnstake,
  // polkadotPrepareClaimUnstaked,
  // polkadotSignAndSend,
  // prepareStakeWithoutDelegation,
  // prepareUnstakeWithoutDelegation,
  // buildCustomTransaction,
  // getWalletRewards,
  // getRedelegationUnlockDate,
}
