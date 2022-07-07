import api from '../../../api'
import { debugConsoleLog } from '../../../helpers/debugConsoleLog'

// not supported by default
export const getStakeList = async function () {
  debugConsoleLog('**getStakeList-instance before api')
  const { data } = await api.requests.getStakeList({
    net: this.net,
    address: this.address,
  })
  debugConsoleLog('**getStakeList-instance data after api', data)
  return data
}
