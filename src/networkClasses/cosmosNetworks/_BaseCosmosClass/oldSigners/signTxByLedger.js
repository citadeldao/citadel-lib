import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from '../signers/getLedgerApp'
import errors from '../../../../errors'

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync'
) => {
  // prepare ledger app
  const ledgerApp = await getLedgerApp()
  const hdPath = getHdDerivationPath(derivationPath)
  const response = await ledgerApp.cosmosApp.sign(hdPath, rawTransaction.bytes)

  if (!response.signature) {
    errors.throwError('LedgerError', {
      message: response.error_message,
      code: response.return_code,
    })
  }
  // dynamic import for guge module
  const { default: secp256k1} = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(response.signature)
  const signatureBase64 = Buffer.from(parsedSignature, 'binary').toString(
    'base64'
  )

  const signedTx = {
    tx: {
      msg: rawTransaction.json.msgs,
      fee: rawTransaction.json.fee,
      signatures: [
        {
          account_number: rawTransaction.json.account_number,
          sequence: rawTransaction.json.sequence,
          signature: signatureBase64,
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: Buffer.from(publicKey, 'hex').toString('base64'),
          },
        },
      ],
      memo: rawTransaction.json.memo,
    },
    mode: modeType,
  }
  return signedTx
}
