import api from '../../api'
import { checkInitialization } from '../../helpers/checkArguments'

export default async () => {
  checkInitialization()
  const { data } = await api.requests.getAllRewards()
  return data
}
