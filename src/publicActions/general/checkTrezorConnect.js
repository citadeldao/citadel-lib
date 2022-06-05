import { checkInitialization } from '../../helpers/checkArguments'
import { prepareTrezorConnection } from '../../networks/networkClasses/_functions/trezor'

export default async () => {
  checkInitialization()
  return await prepareTrezorConnection()
}
