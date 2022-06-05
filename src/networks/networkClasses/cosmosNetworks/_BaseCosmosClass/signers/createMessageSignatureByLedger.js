import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from './getLedgerApp'
import errors from '../../../../../errors'

const secp256k1 = require('secp256k1')

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
  const parsedSignature = secp256k1.signatureImport(response.signature)
  return Buffer.from(parsedSignature).toString('hex')
}
