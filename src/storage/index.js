import { wallets } from './wallets'
import { caches } from './caches'
/***************** NETWORK CLASSES MODULE *****************
 * Сontains all networks logic
 *
 * Exports by default an object with a method for module configuration, getting a class, creating a class instance
 *
 * Static class methods describe common network methods (getting marketcaps for example)
 * Network (wallet) instance methods describe the methods of a specific wallet (signing a transaction for example)
 * Each network group has a base class with common methods. Network classes extend the base class.
 *
 * HOW TO USE:
 * // call some static network method:
 * const data = await networkClasses.getNetworkcClass('btc').getMarketcaps()
 **********************************************************/

const clearCache = () => {
  wallets.clearCache()
  caches.clearCache()
}

export default {
  clearCache,
  wallets,
  caches,
}
