import networkClasses from '../../../../networkClasses'
import { WALLET_TYPES } from '../../../../constants'
import errors from '../../../../errors'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'

export async function getViewingKeyByKeplr(token) {
  if (this.type !== WALLET_TYPES.KEPLR) {
    errors.throwError('MethodNotSupported', {
      message: `Method "getViewingKeyByKeplr" only supported by "${WALLET_TYPES.KEPLR}" wallet type. Current wallet type is ${this.type}`,
    })
  }
  const contractAddress = networkClasses.getNetworkClass(this.net).tokens[token]
    .address

  const keplr = await this.getKeplr()

  const chainId = keplrChains[this.net]

  try {
    // get viewingKey
    return await keplr.getSecret20ViewingKey(chainId, contractAddress)
  } catch (error) {
    errors.throwError('KeplrError', {
      message: error.message,
      code: error.code,
    })
  }
}
