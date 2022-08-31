import errors from '../../../../errors'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'

export const getViewingKeyByKeplr = async (
  net,
  contractAddress,
  walletAddress
) => {
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

    // check current keplr address
    const keplrAddress = (await keplr.getKey(chainId))?.bech32Address
    if (walletAddress !== keplrAddress) {
      errors.throwError('KeplrError', {
        message: 'Please change account in Keplr',
        code: 1,
      })
    }

    // get viewingKey
    return await keplr.getSecret20ViewingKey(chainId, contractAddress)
  } catch (error) {
    errors.throwError('KeplrError', {
      message: error.message,
      code: error.code,
    })
  }
}
