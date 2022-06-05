import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import addWalletByMnemonic from './addWalletByMnemonic'
import errors from '../../errors'

export default async (walletsOptions) => {
  checkInitialization()

  checkTypes(['walletsOptions', walletsOptions, ['Array'], true])
  !walletsOptions.length &&
    errors.throwError('WrongArguments', {
      message: 'walletsOptions array is empty',
    })
  // check title type
  walletsOptions.map(({ title }, index) => {
    checkTypes([(`[walletIndex_${index}].title`, title, ['String'])])
  })

  const createdWallets = await Promise.all(
    walletsOptions.map(async (walletOptions, walletIndex) => {
      try {
        // add wallet by mnemonic
        return await addWalletByMnemonic(walletOptions)
        // ctach error to continue3
      } catch (error) {
        console.warn(`Wallet with net "${walletOptions.net}" and`, error)
        error.message = `For wallet with net "${walletOptions.net}" and index "${walletIndex}". ${error.message}`
        // if error - return object with error instead wallet
        return { error: error.toString() }
      }
    })
  )
  // filter not added wallets
  return createdWallets.filter((item) => item)
}
