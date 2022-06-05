import { checkInitialization } from '../../helpers/checkArguments'
import api from '../../api'

export default async () => {
  checkInitialization()
  const { data } = await api.requests.getActiveDaoHolders()
  return data
}
