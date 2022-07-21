import { getSignerWallet } from './functions/getSignerWallet'
import { SecretNetworkClient } from 'secretjs'
import { GRPC_WEB_URL } from '../../../../constants'

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
  const signerWallet = await getSignerWallet({
    privateKey,
    derivationPath,
    type,
    publicKey,
    address,
  })

  // prepare secret client
  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl: GRPC_WEB_URL,
    chainId: 'secret-4',
    // wallet: signerWallet,
    wallet: signerWallet,
    walletAddress: address,
  })

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
