import {
  VIEWING_KEYS_TYPES,
  // WALLET_TYPES
} from '../../../../constants'
import snip20Manager from '../snip20Manager'
import networkClasses from '../../../'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'
import errors from '../../../../errors'
// import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'

export async function setViewingKey(
  token,
  viewingKeyType,
  { privateKey, derivationPath, viewingKey, fee = 0.003 } = {}
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  // // separate flow for kepler
  // if (this.type === WALLET_TYPES.KEPLR) {
  //   try {
  //     const keplr = await this.getKeplr()
  //     console.log('>>> keplr', keplr)
  //     const chainId = keplrChains[this.net]
  //     console.log('>>> chainId', chainId)
  //     const data = await keplr.suggestToken(
  //       chainId,
  //       networkClass.tokens[token].address
  //     )
  //     console.log('>>> keplr data', data)
  //     return
  //   } catch (error) {
  //     console.log('>>> error', error)
  //     return
  //   }
  // }

  if (this.balance.calculatedBalance < fee) {
    errors.throwError('ViewingKeyError', { message: 'Insufficient funds' })
  }

  // set viewingKey
  const data = await snip20Manager.setViewingKey(viewingKeyType, {
    address: this.address,
    contractAddress: networkClass.tokens[token].address,
    type: this.type,
    publicKey: this.publicKey,
    privateKey,
    privateKeyHash: this.privateKeyHash,
    derivationPath,
    viewingKey,
    fee,
  })

  // load balance
  await this.loadSnip20TokenBalance(
    token,
    viewingKey || data.viewingKey,
    viewingKeyType || VIEWING_KEYS_TYPES.CUSTOM
  )

  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // return hash and new VK
  return data
}
