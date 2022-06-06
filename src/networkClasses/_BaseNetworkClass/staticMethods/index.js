import { validateAddress } from './validateAddress'
import { getNetworkMarketcap } from './getNetworkMarketcap'
import { getNetworkConfig } from './getNetworkConfig'
import { getStakeNodes } from './getStakeNodes'
import { createPublicWallet } from './createPublicWallet'
import { formatPublicKeyFromBuffer } from './formatPublicKeyFromBuffer'
import { getAccountsByPrivateKey } from './getAccountsByPrivateKey'
import { createWalletByLedger } from './createWalletByLedger'
import { createWalletByTrezor } from './createWalletByTrezor'
import { formatAddress } from './formatAddress'
import { decodePrivateKeyByPassword } from './decodePrivateKeyByPassword'
import { encodePrivateKeyByPassword } from './encodePrivateKeyByPassword'
import { calculateBalance } from './calculateBalance'
import { postTransactionNote } from './postTransactionNote'
import { getCurrencyHistoryByRange } from './getCurrencyHistoryByRange'
import { getDerivationPathTemplates } from './getDerivationPathTemplates'
import { getDerivationPathByIndex } from './getDerivationPathByIndex'
import { getTransactionDuration } from './getTransactionDuration'

export const staticMethods = {
  validateAddress,
  getNetworkMarketcap,
  getNetworkConfig,
  getStakeNodes,
  createPublicWallet,
  formatPublicKeyFromBuffer,
  getAccountsByPrivateKey,
  createWalletByLedger,
  createWalletByTrezor,
  formatAddress,
  decodePrivateKeyByPassword,
  encodePrivateKeyByPassword,
  calculateBalance,
  postTransactionNote,
  getCurrencyHistoryByRange,
  getDerivationPathTemplates,
  getDerivationPathByIndex,
  getTransactionDuration,
}
