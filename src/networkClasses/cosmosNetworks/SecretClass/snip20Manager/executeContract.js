import { getSignerWallet } from './functions/getSignerWallet'
import { SecretNetworkClient } from 'secretjs'
import { GRPC_WEB_URL } from '../../../../constants'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'

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
  keplr,
  enigmaUtils,
}) => {
  const chainId = keplrChains.secret

  const signerWallet = await getSignerWallet({
    privateKey,
    derivationPath,
    type,
    publicKey,
    address,
    chainId,
    keplr,
  })

  // prepare secret client
  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl: GRPC_WEB_URL,
    chainId,
    // wallet: signerWallet,
    wallet: signerWallet,
    walletAddress: address,
    // encode tx for decode after execute. Tx will encoded by random key if utils not passed
    enigmaUtils,
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
