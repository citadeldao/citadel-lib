import { getSecretClient } from './functions/getSecretClient'

export const executeContract = async ({
  address,
  contractAddress,
  message,
  sentFunds = [],
  gasLimit,
  privateKey,
  derivationPath,
  type,
  publicKey,
  simulate = false,
}) => {
  // prepare secret client
  const secretjs = await getSecretClient({
    address,
    privateKey,
    derivationPath,
    type,
    publicKey,
  })
console.log(44,contractAddress);
  // get contract codeHash
  const codeHash = await secretjs.query.compute.contractCodeHash(
    contractAddress
  )

  // simulate to estimate gas
  if (simulate) {
    return await secretjs.tx.compute.executeContract.simulate({
      sender: address,
      contractAddress,
      codeHash, // optional but way faster
      msg: message,
      sentFunds, // optional
    })
  }
  // execute contract
  return await secretjs.tx.compute.executeContract(
    {
      sender: address,
      contractAddress,
      codeHash, // optional but way faster
      msg: message,
      sentFunds, // optional
    },
    gasLimit
  )
}
