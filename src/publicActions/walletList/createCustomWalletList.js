import api from '../../api'
import { checkTypes, checkInitialization } from '../../helpers/checkArguments'

export const createCustomWalletList = async (listName, wallets) => {
  // checks
  checkInitialization()
  checkTypes(
    ['listName', listName, ['String'], true],
    ['wallets', wallets, ['Array'], true]
  )

  // call api
  await api.requests.createCustomWalletList({ name: listName, wallets })
}
