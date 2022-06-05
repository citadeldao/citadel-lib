const secp256k1 = require('secp256k1')
const keccak256 = require('keccak256')

import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from '../../_BaseCosmosClass/signers/getLedgerApp'
import errors from '../../../../../errors'

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  publicKey,
  modeType = 'sync'
) => {
  const ledgerApp = await getLedgerApp()
  const hdPath = getHdDerivationPath(derivationPath)
  const response = await ledgerApp.cosmosApp.sign(hdPath, rawTransaction.bytes)

  if (!response.signature) {
    errors.throwError('LedgerError', {
      message: response.error_message,
      code: response.return_code,
    })
  }

  const parsedSignature = secp256k1.signatureImport(response.signature)

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

export const signTxByPrivateKey = (stdSignMsg, publicKeyHex, privateKeyHex) => {
  const msgHash = keccak256(stdSignMsg.bytes)
  const { signature } = secp256k1.ecdsaSign(
    msgHash,
    Buffer.from(privateKeyHex, 'hex')
  )

  return {
    ...stdSignMsg.json,
    signature: Buffer.from(signature).toString('hex'),
    publicKey: publicKeyHex,
  }
}

export const createMessageSignature = (message, privateKeyHex) => {
  const msgHash = keccak256(JSON.stringify(message))
  const { signature } = secp256k1.ecdsaSign(
    msgHash,
    Buffer.from(privateKeyHex, 'hex')
  )

  return Buffer.from(signature).toString('hex')
}
