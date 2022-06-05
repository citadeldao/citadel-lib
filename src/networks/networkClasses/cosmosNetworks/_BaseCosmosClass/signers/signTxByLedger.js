import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from './getLedgerApp'
import errors from '../../../../../errors'
const secp256k1 = require('secp256k1')

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync'
) => {
  const ledgerApp = await getLedgerApp()
  const hdPath = getHdDerivationPath(derivationPath)
  const response = await ledgerApp.cosmosApp.sign(
    hdPath,
    JSON.stringify(rawTransaction.json)
  )

  if (!response.signature) {
    errors.throwError('LedgerError', {
      message: response.error_message,
      code: response.return_code,
    })
  }

  const parsedSignature = secp256k1.signatureImport(
    Buffer.from(response.signature)
  )

  let signMessage = new Object()
  if (
    rawTransaction.json.msgs[0].type === 'irishub/bank/Send' ||
    rawTransaction.json.msgs[0].type === 'irishub/stake/BeginUnbonding' ||
    rawTransaction.json.msgs[0].type === 'irishub/stake/BeginRedelegate'
  ) {
    signMessage = rawTransaction.jsonForSigningIrisTx
  } else {
    signMessage = rawTransaction.json
  }

  const signatureParsed = Buffer.from(parsedSignature).toString('hex')
  // const signMessage = rawTransaction.json
  const signedTx = {
    ...signMessage,
    fee: rawTransaction.json.fee,
    signature: signatureParsed,
    publicKey,
    memo: rawTransaction.json.memo,
    mode: modeType,
  }

  return signedTx
}
