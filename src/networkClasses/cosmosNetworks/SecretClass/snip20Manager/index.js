import { getTokenTransactions } from './getTokenTransactions'
import { getTokenBalance } from './getTokenBalance'
import { doTokenTransfer } from './doTokenTransfer'
// import { convertSecretScrtToScrt } from './convertSecretScrtToScrt'
import { convertScrtToSecretScrt } from './convertScrtToSecretScrt'
import { doCrossNetworkTransfer } from './doCrossNetworkTransfer'
import { setViewingKey } from './setViewingKey'
import { generateSimpleViewingKey } from './generateSimpleViewingKey'
import { queryContract } from './queryContract'
import { executeContract } from './executeContract'

export default {
  getTokenTransactions,
  getTokenBalance,
  doTokenTransfer,
  // convertSecretScrtToScrt,
  convertScrtToSecretScrt,
  doCrossNetworkTransfer,
  setViewingKey,
  generateSimpleViewingKey,
  queryContract,
  executeContract,
}
