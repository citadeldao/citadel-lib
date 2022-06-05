import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

export default async (newValue) => {
  checkInitialization()
  checkTypes(['newValue', newValue, ['Boolean']])
  const { data } = await api.requests.subscribeRewards({ newValue })
  return data
}
