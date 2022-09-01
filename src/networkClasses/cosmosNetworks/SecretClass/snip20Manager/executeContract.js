import { getSignerWallet } from './functions/getSignerWallet'
import { SecretNetworkClient } from 'secretjs'
import {
  GRPC_WEB_URL,
  SECRET_NET_KEY,
  WALLET_TYPES,
} from '../../../../constants'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'
import walletInstances from '../../../../walletInstances'

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
  // get keplr and enigmaUtils
  const walletInstance = walletInstances.getWalletInstanceByAddress(
    SECRET_NET_KEY,
    address
  )

  let encryptionUtils = null
  let keplr = null
  const chainId = keplrChains.secret

  if (walletInstance.type === WALLET_TYPES.KEPLR) {
    keplr = await walletInstance.getKeplr()
    encryptionUtils = await keplr.getEnigmaUtils(chainId)
  }

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
    encryptionUtils,
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
