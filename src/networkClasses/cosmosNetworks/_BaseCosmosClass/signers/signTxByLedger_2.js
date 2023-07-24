import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from './getLedgerApp'
import errors from '../../../../errors'
import { sortObject } from '../functions'

//alternative signer
export const signTxByLedger_2 = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync',
  transportType
) => {
  const ledgerApp = await getLedgerApp(transportType)
  const hdPath = getHdDerivationPath(derivationPath)
  const response = await ledgerApp.cosmosApp.sign(
    hdPath,
    JSON.stringify(sortObject(rawTransaction.json))
  )

  if (!response.signature) {
    errors.throwError('LedgerError', {
      message: response.error_message,
      code: response.return_code,
    })
  }

  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(
    Buffer.from(response.signature)
  )

  let signMessage = new Object()
  if (
    rawTransaction?.json?.msgs?.[0]?.type === 'irishub/bank/Send' ||
    rawTransaction?.json?.msgs?.[0]?.type === 'irishub/stake/BeginUnbonding' ||
    rawTransaction?.json?.msgs?.[0]?.type === 'irishub/stake/BeginRedelegate'
  ) {
    signMessage = rawTransaction.jsonForSigningIrisTx
  } else {
    signMessage = rawTransaction.json
  }

  const signatureParsed = Buffer.from(parsedSignature).toString('hex')
  // const signMessage = rawTransaction.json
  const signedTx = {
    // ...sortObject(signMessage),
    ...signMessage,
    fee: rawTransaction.json.fee,
    signature: signatureParsed,
    publicKey,
    memo: rawTransaction.json.memo,
    mode: modeType,
  }

  return signedTx
}
