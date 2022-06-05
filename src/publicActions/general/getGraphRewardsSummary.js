import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

export default async (options = {}) => {
  checkInitialization()
  checkTypes(['options', options, ['Object']])

  const { dateFrom, dateTo, listId } = options

  checkTypes(
    ['dateFrom', dateFrom, ['String', 'Number']],
    ['dateTo', dateTo, ['String', 'Number']],
    ['listId', listId, ['String', 'Number']]
  )
  const { data } = await api.requests.getGraphRewardsSummary({
    dateFrom,
    dateTo,
    listId,
  })
  return data
}
