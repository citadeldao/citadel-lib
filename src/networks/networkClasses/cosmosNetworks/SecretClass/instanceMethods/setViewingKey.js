import { VIEWING_KEYS_TYPES } from '../../../../../constants'
import snip20Manager from '../snip20Manager'
import networks from '../../../..'
import { sleep } from '../../../../../helpers/sleep'

export async function setViewingKey(
  token,
  viewingKeyType,
  { privateKey, derivationPath, viewingKey, fee } = {}
) {
  const networkClass = networks.getNetworkClass(this.net)

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
  })

  // wait for the key to be installed before saving it to the instance
  const PAUSE_BETWEEN_CHECKS = 2000
  const MAX_NUMBER_OF_CHECKS = 60
  let currentСheckТumber = 0
  // let balance = { calculatedBalance: 0, mainBalance: 0 }
  while (currentСheckТumber < MAX_NUMBER_OF_CHECKS) {
    // try to get balance with settable key
    const { error } = await snip20Manager.getTokenBalance(
      this.address,
      networkClass.tokens[token].address,
      networkClass.tokens[token].decimals,
      viewingKey
    )
    // break on success
    if (!error) {
      break
    }
    // try again
    await sleep(PAUSE_BETWEEN_CHECKS)
    currentСheckТumber++
  }

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
