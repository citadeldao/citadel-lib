import errors from '../../../../errors'
import { debugConsoleLog } from '../../../../helpers/debugConsoleLog'
import snip20Manager from '../snip20Manager'

export async function executeMessageCollection(
  /** messages model:
      [{
        sender,
        contractAddress,
        codeHash, // optional but way faster
        msg,
        sentFunds, // optional
      }]
    */
  messages,
  { privateKey, derivationPath }
) {
  const GAS_PRICE = 0.0125
  // estimate gas
  let gas
  try {
    // broadcast messages
    const response = await snip20Manager.broadcast({
      address: this.address,
      messages,
      privateKey,
      derivationPath,
      type: this.type,
      publicKey: this.publicKey,
      simulate: true,
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

  // broadcast messages
  const response = await snip20Manager.broadcast({
    address: this.address,
    messages,
    gasLimit: {
      gasLimit: gas,
      gasPriceInFeeDenom: GAS_PRICE,
    },
    privateKey,
    derivationPath,
    type: this.type,
    publicKey: this.publicKey,
    simulate: false,
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
