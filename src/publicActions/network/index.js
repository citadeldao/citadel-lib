import { validateAddress } from './validateAddress'
import { createWalletByPrivateKey } from './createWalletByPrivateKey'
import { createWalletByMnemonic } from './createWalletByMnemonic'
import { getNetworkMarketcap } from './getNetworkMarketcap'
import { getNetworkConfig } from './getNetworkConfig'
import { getStakeNodes } from './getStakeNodes'
import { getAccountsByPrivateKey } from './getAccountsByPrivateKey'
import { createWalletByLedger } from './createWalletByLedger'
import { createWalletByTrezor } from './createWalletByTrezor'
import { decodePrivateKeyByPassword } from './decodePrivateKeyByPassword'
import { encodePrivateKeyByPassword } from './encodePrivateKeyByPassword'
import { postTransactionNote } from './postTransactionNote'
import { getCurrencyHistoryByRange } from './getCurrencyHistoryByRange'
import { getDerivationPathTemplates } from './getDerivationPathTemplates'
import { getDerivationPathByIndex } from './getDerivationPathByIndex'
import { getTransactionDuration } from './getTransactionDuration'

// Methods that take a network key as an argument. Wrappers over static methods of grid classes
export const network = {
  validateAddress,
  createWalletByPrivateKey,
  createWalletByMnemonic,
  getNetworkMarketcap,
  getNetworkConfig,
  getStakeNodes,
  getAccountsByPrivateKey,
  createWalletByLedger,
  createWalletByTrezor,
  decodePrivateKeyByPassword,
  encodePrivateKeyByPassword,
  postTransactionNote,
  getCurrencyHistoryByRange,
  getDerivationPathTemplates,
  getDerivationPathByIndex,
  getTransactionDuration,
}
