import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import storage from '../../storage'
import api from '../../api'

export default async (walletsOptions) => {
  checkInitialization()

  checkTypes(['walletsOptions', walletsOptions, ['Array'], true])

  walletsOptions.map(({ id }, index) => {
    checkTypes([`[walletIndex_${index}].id`, id, ['String', 'Number'], true])
  })

  // fast parallel remove
  await Promise.all(
    walletsOptions.map(async ({ id }) => {
      try {
        await api.requests.removeWallet(id)
      } catch (error) {
        console.error(error)
      }
      storage.wallets.removeWallet(id)
    })
  )
}
