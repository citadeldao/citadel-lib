import TrezorConnect from 'trezor-connect'
import { prepareTrezorConnection } from '../../../_functions/trezor'
import { toHexNumber } from '../../../_functions/crypto'
import { ethereumHardwareSigner } from './functions'

export const signTxByTrezor = async (rawTransaction, derivationPath) => {
  await prepareTrezorConnection()
  const signFunction = async () => {
    try {
      const signed = await TrezorConnect.ethereumSignTransaction({
        path: derivationPath,
        // @ts-ignore
        transaction: {
          ...rawTransaction,
          gasLimit: toHexNumber(rawTransaction.gas),
          gasPrice: toHexNumber(rawTransaction.gasPrice),
          nonce: toHexNumber(rawTransaction.nonce),
          // @ts-ignore
          value: rawTransaction.value || '0x0',
        },
      })

      if (signed.success) {
        const { v, r, s } = signed.payload

        return { recoveryParam: v.slice(2), r: r.slice(2), s: s.slice(2) }
      }
    } catch (err) {
      const error = new Error(err.message)
      error.code = err.statusCode
      throw error
    }
  }

  return ethereumHardwareSigner(
    {
      ...rawTransaction,
    },
    signFunction,
    false
  )
}
