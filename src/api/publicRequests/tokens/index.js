import { xct } from './xct'
import { getAllTokenBalances } from './getAllTokenBalances'
import { getEvmAllowance } from './getEvmAllowance'
import { getEvmApprove } from './getEvmApprove'

export const tokens = {
  getAllTokenBalances,
  getEvmAllowance,
  getEvmApprove,
  ...xct,
}
