import errors from '../../../../errors'
import { debugConsoleLog } from '../../../../helpers/debugConsoleLog'
import snip20Manager from '../snip20Manager'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'
import { WALLET_TYPES } from '../../../../constants'

export async function executeContract({
  privateKey,
  derivationPath,
  contract,
  gas,
  msg,
  sender = this.address,
  sentFunds,
} = {}) {
  const GAS_PRICE = 0.0125

  // get enigmaUtils to decode transaction history after execute (so far only for kepler)
  let enigmaUtils = null
  let keplr = null

  if (this.type === WALLET_TYPES.KEPLR) {
    const chainId = keplrChains[this.net]
    keplr = await this.getKeplr()
    enigmaUtils = await keplr.getEnigmaUtils(chainId)
  }

  if (!gas) {
    try {
      // estimate gas
      const response = await snip20Manager.executeContract({
        address: sender,
        contractAddress: contract,
        message: msg,
        privateKey,
        derivationPath,
        type: this.type,
        publicKey: this.publicKey,
        simulate: true,
        sentFunds,
        keplr,
        enigmaUtils,
      })

      // set estimated gas
      if (response?.gasInfo?.gasUsed) {
        gas = response?.gasInfo?.gasUsed * 1.5
        debugConsoleLog('K and gas simulate', 1.5, gas)
      }
    } catch (error) {
      console.warn('Simulate secret tx error')
      console.warn(error)
    }
  }

  // execute contract
  const response = await snip20Manager.executeContract({
    address: sender,
    contractAddress: contract,
    message: msg,
    gasLimit: {
      gasLimit: gas,
      gasPriceInFeeDenom: GAS_PRICE,
    },
    privateKey,
    sentFunds,
    derivationPath,
    type: this.type,
    publicKey: this.publicKey,
    keplr,
    enigmaUtils,
  })

  // check error (not sure if this is a reliable way)
  if (response.data?.length === 0) {
    // throw error if data array is empty
    errors.throwError('RequestError', {
      message: response.rawLog,
    })
  }

  return [response.transactionHash]
}
