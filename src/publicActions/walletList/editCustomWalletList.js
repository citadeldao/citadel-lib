import api from '../../api'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'

export const editCustomWalletList = async (listId, listName, wallets) => {
  // checks
  checkInitialization()
  checkTypes(
    ['listId', listId, ['String', 'Number'], true],
    ['listName', listName, ['String'], true],
    ['wallets', wallets, ['Array'], true]
  )

  // call api
  await api.requests.editCustomWalletList({ listId, name: listName, wallets })
}
