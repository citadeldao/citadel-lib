import { VIEWING_KEYS_TYPES, WALLET_TYPES } from '../../../../constants'
import snip20Manager from '../snip20Manager'
import networkClasses from '../../../'
import { dispatchLibEvent } from '../../../../generalFunctions/dispatchLibEvent'
import { LIB_EVENT_NAMES } from '../../../../constants'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'

export async function setViewingKey(
  token,
  viewingKeyType,
  { privateKey, derivationPath, viewingKey, fee } = {}
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  // get enigmaUtils to decode transaction history after execute (so far only for kepler)
  let enigmaUtils = null
  let keplr = null

  if (this.type === WALLET_TYPES.KEPLR) {
    const chainId = keplrChains[this.net]
    keplr = await this.getKeplr()
    enigmaUtils = await keplr.getEnigmaUtils(chainId)
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
    keplr,
    enigmaUtils,
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
