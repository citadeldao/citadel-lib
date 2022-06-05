import storage from '../../storage'
import { checkInitialization } from '../../helpers/checkArguments'

export default async () => {
  checkInitialization()
  return storage.caches.getCache('rates')
}
