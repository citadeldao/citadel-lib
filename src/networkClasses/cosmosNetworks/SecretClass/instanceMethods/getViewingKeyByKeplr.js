import snip20Manager from '../snip20Manager'
import networkClasses from '../../../../networkClasses'
import { WALLET_TYPES } from '../../../../constants'
import errors from '../../../../errors'

export async function getViewingKeyByKeplr(token) {
  console.log('TOKEN', token)
  if (this.type !== WALLET_TYPES.KEPLR) {
    errors.throwError('MethodNotSupported', {
      message: `Method "getViewingKeyByKeplr" only supported by "${WALLET_TYPES.KEPLR}" wallet type. Current wallet type is ${this.type}`,
    })
  }
  const contractAddress = networkClasses.getNetworkClass(this.net).tokens[token]
    .address
  return await snip20Manager.getViewingKeyByKeplr(this.net, contractAddress)
}
