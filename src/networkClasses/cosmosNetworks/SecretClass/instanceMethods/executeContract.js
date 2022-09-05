import errors from '../../../../errors'
import { debugConsoleLog } from '../../../../helpers/debugConsoleLog'
import snip20Manager from '../snip20Manager'

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
