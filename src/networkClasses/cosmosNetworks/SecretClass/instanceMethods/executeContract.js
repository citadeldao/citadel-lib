import snip20Manager from '../snip20Manager'

export async function executeContract({
  privateKey,
  derivationPath,
  contract,
  gas,
  msg,
  sender,
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
    derivationPath,
    type: this.type,
    publicKey: this.publicKey,
  })

  return response
}
