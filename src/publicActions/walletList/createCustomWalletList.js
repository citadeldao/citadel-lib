import api from '../../api'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'

export default async (listName, wallets) => {
  checkInitialization()
  checkTypes(
    ['listName', listName, ['String'], true],
    ['wallets', wallets, ['Array'], true]
  )
  await api.requests.createCustomWalletList({ name: listName, wallets })
}
