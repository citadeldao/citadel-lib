import api from '../../api'
import { checkInitialization } from '../../helpers/checkArguments'

export default async () => {
  checkInitialization()
  const { data } = await api.requests.getRewards()
  return data
}
