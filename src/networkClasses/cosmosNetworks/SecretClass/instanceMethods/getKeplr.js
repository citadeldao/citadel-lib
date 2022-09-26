import { WALLET_TYPES } from '../../../../constants'
import errors from '../../../../errors'
import { keplrChains } from '../../_BaseCosmosClass/signers/keplrChains'

export async function getKeplr() {
  if (this.type !== WALLET_TYPES.KEPLR) {
    return
  }
  const keplr = window.keplr
  const chainId = keplrChains[this.net]

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
    if (this.address !== keplrAddress) {
      errors.throwError('KeplrError', {
        message: 'Please change account in Keplr',
        code: 1,
      })
    }

    return keplr
  } catch (error) {
    errors.throwError('KeplrError', {
      message: error.message,
      code: error.code,
    })
  }
}
