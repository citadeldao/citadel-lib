import { xct } from './xct'
import { getAllTokenBalances } from './getAllTokenBalances'
import { getAllTokensByNet } from './getAllTokens'

export const tokens = {
  getAllTokenBalances,
  getAllTokensByNet,
  ...xct,
}
