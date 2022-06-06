import api from '../../api'
import { checkInitialization } from '../../helpers/checkArguments'

export const getCustomWalletLists = async () => {
  // checks
  checkInitialization()

  // call api
  const { data } = await api.requests.getCustomWalletLists()
  return data
}
