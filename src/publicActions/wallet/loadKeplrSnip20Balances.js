import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import { WALLET_TYPES } from '../../constants'
import walletInstances from '../../walletInstances'
import errors from '../../errors'

export const loadKeplrSnip20Balances = async (walletId) => {
  // checks
  checkInitialization()
  checkTypes(['walletId', walletId, ['String', 'Number'], true])
  checkWalletId(walletId)

  const walletInstance = walletInstances.getWalletInstanceById(walletId)

  if (walletInstance.type !== WALLET_TYPES.KEPLR) {
    errors.throwError('MethodNotSupported', {
      message: `"${walletInstance.type}" wallet type doesn't support "loadKeplrSnip20Balances" method (for "keplr" type only)`,
    })
  }

  // call wallet instance method
  return await walletInstance.loadKeplrSnip20Balances()
}
