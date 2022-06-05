import storage from '../../storage'
import { checkInitialization } from '../../helpers/checkArguments'

export default () => {
  checkInitialization()
  return storage.caches.getCache('marketcaps')
}
