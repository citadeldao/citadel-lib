import api from '../../api'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'

export const deleteCustomWalletList = async (listId) => {
  // checks
  checkInitialization()
  checkTypes(['listId', listId, ['String'], true])

  // call api
  await api.requests.deleteCustomWalletList({ listId })
}
