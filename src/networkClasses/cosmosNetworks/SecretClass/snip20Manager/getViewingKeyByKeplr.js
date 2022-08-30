import errors from '../../../../errors'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'

export const getViewingKeyByKeplr = async (net, contractAddress) => {
  const keplr = window.keplr
  const chainId = keplrChains[net]

  if (!keplr) {
    errors.throwError('KeplrError', {
      message: 'Keplr not found in your browser',
    })
  }

  try {
    // enable keplr
    await keplr.enable(chainId)
    // get viewingKey
    return await keplr.getSecret20ViewingKey(chainId, contractAddress)
  } catch (error) {
    errors.throwError('KeplrError', {
      message: error.message,
    })
  }
}
