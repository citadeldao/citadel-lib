import { VIEWING_KEYS_TYPES } from '../../../../constants'
import snip20Manager from '../snip20Manager'
import networkClasses from '../../../'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'
import errors from '../../../../errors'

export async function setViewingKey(
  token,
  viewingKeyType,
  { privateKey, derivationPath, viewingKey, fee = 0.003 } = {}
) {
  console.log('>>>fee', fee)
  console.log('>>>this.balance.calculatedBalance', this.balance.calculatedBalance)
  if (this.balance.calculatedBalance < fee) {
    errors.throwError('ViewingKeyError', { message: 'Insufficient funds' })
  }
  const networkClass = networkClasses.getNetworkClass(this.net)

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
    VIEWING_KEYS_TYPES.RANDOM ? VIEWING_KEYS_TYPES.CUSTOM : viewingKeyType
  )

  dispatchLibEvent(LIB_EVENT_NAMES.WALLET_LIST_UPDATED)

  // return hash and new VK
  return data
}
