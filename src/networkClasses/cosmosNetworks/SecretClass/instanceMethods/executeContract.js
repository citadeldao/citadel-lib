import errors from '../../../../errors'
import snip20Manager from '../snip20Manager'

export async function executeContract({
  privateKey,
  derivationPath,
  contract,
  gas,
  msg,
  sender,
  sentFunds,
} = {}) {
  const GAS_PRICE = 0.0125
  if (!gas) {
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
      gas = response?.gasInfo?.gasUsed * 1.1
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
