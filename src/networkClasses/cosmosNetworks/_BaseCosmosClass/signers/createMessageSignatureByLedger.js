import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from './getLedgerApp'
import errors from '../../../../errors'

export const createMessageSignatureByLedger = async (data, derivationPath) => {
  const ledgerApp = await getLedgerApp()
  const hdPath = getHdDerivationPath(derivationPath)
  const response = await ledgerApp.cosmosApp.sign(hdPath, JSON.stringify(data))
  if (!response.signature) {
    errors.throwError('LedgerError', {
      message: response.error_message,
      code: response.return_code,
    })
  }
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(response.signature)
  return Buffer.from(parsedSignature).toString('hex')
}
