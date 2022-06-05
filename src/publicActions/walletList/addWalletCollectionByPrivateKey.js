import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import errors from '../../errors'
import addWalletByPrivateKey from './addWalletByPrivateKey'

export default async (walletsOptions) => {
  checkInitialization()

  checkTypes(['walletsOptions', walletsOptions, ['Array'], true])
  !walletsOptions.length &&
    errors.throwError('WrongArguments', {
      message: 'walletsOptions array is empty ',
    })

  walletsOptions.map(({ title }, index) => {
    checkTypes([`[walletIndex_${index}].title`, title, ['String']])
  })

  const createdWallets = await Promise.all(
    walletsOptions.map(async (walletOptions, walletIndex) => {
      try {
        return await addWalletByPrivateKey(walletOptions)
      } catch (error) {
        error.message = `For wallet with net "${walletOptions.net}" and index "${walletIndex}". ${error.message}`
        // if error - return object with error instead wallet
        return { error: error.toString() }
      }
    })
  )
  // filter not added wallets
  return createdWallets.filter((item) => item)
}
