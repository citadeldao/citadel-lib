import { checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

export const getActiveDaoHolders = async () => {
  // checks
  checkInitialization()

  // call api
  const { data } = await api.requests.getActiveDaoHolders()
  return data
}
