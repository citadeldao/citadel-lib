import { getHdDerivationPath } from '../../../_functions/ledger'
import { ledgerErrorHandler } from "./../functions"
import { getLedgerTransport } from "../../../../ledgerTransportProvider";
//import { getLedgerApp } from '../signers/getLedgerApp'
// import errors from '../../../../errors'

//alternative signer
export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync',
  rightApp
) => {
  // prepare ledger app
  // const ledgerApp = await getLedgerApp()
  // const response = await ledgerApp.cosmosApp.sign(hdPath, rawTransaction.bytes)
  const { default: CosmosApp } = await import('ledger-cosmos-js')
  const transport = await getLedgerTransport()
  const cosmosApp = new CosmosApp(transport)
  const hdPath = getHdDerivationPath(derivationPath)
  const resp = await cosmosApp.sign(hdPath, rawTransaction.bytes)

  // if (!response.signature) {
  //   errors.throwError('LedgerError', {
  //     message: response.error_message,
  //     code: response.return_code,
  //   })
  // }
  if (!resp.signature) {
    const appInfo = await cosmosApp.appInfo()
    await transport.close()
    ledgerErrorHandler({ appInfo, resp, rightApp })
  }
  await transport.close()
  // dynamic import for huge module
  const { default: secp256k1} = await import('secp256k1')
  const parsedSignature = secp256k1.signatureImport(resp.signature)
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
