import networkClasses from '../../networkClasses'
import BigNumber from 'bignumber.js'
import api from '..'
import { OUR_TOKEN } from './../../constants'
// modify the backend response (will move to the backend in the future)
export const getDelegationBalance = async (options) => {
  // get original response
  const { data } = await api.requests.getDelegationBalance(options)

  // calc balance
  if (options.net === OUR_TOKEN) {
    const { mainBalance = 0, stake = 0, frozenBalance = 0 } = data
    data.calculatedBalance = BigNumber(mainBalance)
      .plus(stake)
      .plus(frozenBalance)
      .toNumber()
  } else {
    data.calculatedBalance = networkClasses
      .getNetworkClass(networkClasses.getNativeNet(options.net))
      .calculateBalance(data)
  }

  return { data }
}
