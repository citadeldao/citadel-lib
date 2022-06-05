import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import addWalletByPublicKey from './addWalletByPublicKey'

export default async (walletsOptions) => {
  // сhecks
  checkInitialization()
  checkTypes(['walletsOptions', walletsOptions, ['Array'], true])
  walletsOptions.map(({ net, address, title }, index) => {
    checkTypes(
      [`[walletIndex_${index}].net`, net, ['String'], true],
      [`[walletIndex_${index}].address`, address, ['String'], true],
      [`[walletIndex_${index}].title`, title, ['String']]
    )
  })

  const createdWallets = await Promise.all(
    walletsOptions.map(async (walletOptions, walletIndex) => {
      try {
        return await addWalletByPublicKey(walletOptions)
      } catch (error) {
        error.message = `For wallet with net "${walletOptions.net}" and index "${walletIndex}". ${error.message}`
        // if error - return object with error instead wallet
        return { error: error.toString() }
      }
    })
  )
  return createdWallets.filter((item) => item)
}
