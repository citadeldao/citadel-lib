import { VIEWING_KEYS_TYPES } from '../../../../constants'
import networkClasses from '../../../'

// TODO: refact!
export async function setViewingKey(
  token,
  viewingKeyType,
  { privateKey, derivationPath, viewingKey, fee } = {}
) {
  // dynamic import module with huge npm package
  const { default: snip20Manager } = await import('../snip20Manager')
  const networkClass = networkClasses.getNetworkClass(this.net)

  // set vievingKey
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
    decimals: networkClass.tokens[token].decimals,
  })

  // save VK to instance
  this._saveViewingKeyToInstance(
    token,
    data.viewingKey,
    viewingKeyType === VIEWING_KEYS_TYPES.RANDOM
      ? VIEWING_KEYS_TYPES.CUSTOM
      : viewingKeyType
  )

  // save VK to storage
  this._saveViewingKeysToStorage()

  // TODO: split updateSubtokensList and updateSnip20SubtokensList, and transfer the known balance

  // updateSubTokenBalances
  await this.updateSubtokensList([token])

  // return hash and new VK
  return data
}
