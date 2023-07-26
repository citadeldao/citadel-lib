import errors from '../../../../errors'
import { debugConsole } from '../../../../helpers/debugConsole'
import snip20Manager from '../snip20Manager'

export async function executeMessageCollection(
  /** messages model:
      [{
        sender,
        contract,
        codeHash, // optional but way faster
        msg,
        sentFunds, // optional
      }]
    */
  messages,
  { privateKey, derivationPath, transportType }
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
      transportType,
      type: this.type,
      publicKey: this.publicKey,
      simulate: true,
    })

    // set estimated gas
    if (response?.gasInfo?.gasUsed) {
      gas = response?.gasInfo?.gasUsed * 1.5
      debugConsole.log('K and gas simulate', 1.5, gas)
    }
  } catch (error) {
    debugConsole.warn('Simulate secret tx error')
    debugConsole.warn(error)
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
    transportType,
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
