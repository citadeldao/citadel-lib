import { getSignerWallet } from './getSignerWallet'
import {
  GRPC_WEB_URL,
  SECRET_NET_KEY,
  WALLET_TYPES,
} from '../../../../../constants'
import { keplrChains } from '../../../_BaseCosmosClass/signers/keplrChains'
import walletInstances from '../../../../../walletInstances'

export const getSecretClient = async ({
  address,
  privateKey,
  derivationPath,
  type,
  publicKey,
  readOnly = false,
}) => {
  // dynamic import of large module (for fast init)
  const { SecretNetworkClient } = await import('secretjs')


  // get keplr and enigmaUtils
  const walletInstance = walletInstances.getWalletInstanceByAddress(
    SECRET_NET_KEY,
    address
  )

  let encryptionUtils = null
  let keplr = null
  const chainId = keplrChains.secret

  if (walletInstance?.type === WALLET_TYPES.KEPLR) {
    try {
      keplr = await walletInstance.getKeplr()
      encryptionUtils = await keplr.getEnigmaUtils(chainId)
    } catch (error) {
      // skip error if readOnly (to use saved keplr VK)
      if (!readOnly) {
        throw error
      }
    }
  }

  if (readOnly) {
    return await SecretNetworkClient.create({
      grpcWebUrl: GRPC_WEB_URL,
      chainId,
      // encode tx for decode after execute. Tx will encoded by random key if utils not passed
      encryptionUtils,
    })
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

  return secretjs
}
