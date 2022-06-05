import { wallets } from './wallets'
import { caches } from './caches'

const clearCache = () => {
  wallets.clearCache()
  caches.clearCache()
}

export default {
  clearCache,
  wallets,
  caches,
}
