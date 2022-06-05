import api from '../../api'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'

export default async (listId) => {
  checkInitialization()
  checkTypes(['listId', listId, ['String'], true])
  await api.requests.deleteCustomWalletList({ listId })
}
