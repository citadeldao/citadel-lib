import { checkTypes } from '../../helpers/checkArguments'
import libCore from '../../libCore'
import { checkInitialization } from '../../helpers/checkArguments'

export default async (wallets, options) => {
  checkTypes(
    ['wallets', wallets, ['Array'], true],
    ['options', options, ['Object']],
    ['addNotAddedWallets', options?.addNotAddedWallets, ['Boolean']]
  )
  checkInitialization()

  // filter not supported networks
  await libCore.setWalletList(wallets, options)
}
