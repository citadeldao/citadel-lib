import { instanceMethods } from './instanceMethods'
import { staticMethods } from './staticMethods'
import { merge } from '../../helpers/merge'

export class BaseNetwork {
  constructor(walletInfo) {
    // add to instance all fields from walletInfo
    merge(this, walletInfo)
  }

  // functions for init/reset library
  static _configure(config) {
    // add to class all fields from config (networks.json)
    merge(this, config)
  }

  static _unconfigure() {
    // set to null all class  properties
    Object.keys(this).map((property) => {
      if (typeof this[property] !== 'function') this[property] = null
    })
  }
}

// ЦФКall methods are placed in files, so we assign them to the class
// add network (static) methods
Object.assign(BaseNetwork, staticMethods)
// add wallet (instance) methods
Object.assign(BaseNetwork.prototype, instanceMethods)
