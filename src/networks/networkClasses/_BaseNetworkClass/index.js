import instanceMethods from './instanceMethods'
import staticMethods from './staticMethods'
import { merge } from '../../../helpers/merge'
export default class BaseNetwork {
  constructor(walletInfo) {
    // add all fields from walletInfo
    merge(this, walletInfo)
  }

  // functions for init/reset library
  static _configure(config) {
    merge(this, config)
  }
  static _unconfigure() {
    Object.keys(this).map((property) => {
      if (typeof this[property] !== 'function') this[property] = null
    })
  }
}

// add network (static) methods
Object.assign(BaseNetwork, staticMethods)
// add wallet (instance) methods
Object.assign(BaseNetwork.prototype, instanceMethods)
