import { xct } from './xct'
import { getAllTokenBalances } from './getAllTokenBalances'

export const tokens = {
  getAllTokenBalances,
  ...xct,
}
