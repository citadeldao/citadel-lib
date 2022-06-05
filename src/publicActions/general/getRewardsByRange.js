import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

export default async (dateFrom, dateTo) => {
  checkInitialization()
  checkTypes(
    ['dateFrom', dateFrom, ['String', 'Number'], true],
    ['dateTo', dateTo, ['String', 'Number']]
  )
  const { data } = await api.requests.getRewardsByRange({ dateFrom, dateTo })
  return data
}
