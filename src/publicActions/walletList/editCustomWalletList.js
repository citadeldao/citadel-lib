import api from '../../api'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'

export default async (listId, listName, wallets) => {
  checkInitialization()
  checkTypes(
    ['listId', listId, ['String', 'Number'], true],
    ['listName', listName, ['String'], true],
    ['wallets', wallets, ['Array'], true]
  )
  await api.requests.editCustomWalletList({ listId, name: listName, wallets })
}
