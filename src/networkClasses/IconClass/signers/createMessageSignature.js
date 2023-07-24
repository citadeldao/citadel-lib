import { sha3_256 as sha3256 } from 'js-sha3'
import {
  WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../../constants'
import { IconApp, ledgerErrorHandler } from '../ledgerApp'
import {getLedgerTransport} from "../../../ledgerTransportProvider";

export async function createMessageSignature(
  message,
  { privateKey, derivationPath, type, rightApp, transportType }
) {
  // privateKey signers
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(type)) {
    // dynamic import for guge module
    const { default: secp256k1 } = await import('secp256k1')
    const result = secp256k1.ecdsaSign(
      Buffer.from(sha3256.update(message).hex(), 'hex'),
      Buffer.from(privateKey, 'hex')
    )
    return Buffer.from(result.signature).toString('hex')
  }
  // ledger signers
  if (type === WALLET_TYPES.LEDGER) {
    // add global ledger app to avoid ledger reconnect error
    let transport = null
    if (!global.ledger_icon) {
      transport = await getLedgerTransport(transportType)
      global.ledger_icon = new IconApp(transport)
    }

    let res
    try{
      res = await global.ledger_icon.signTransaction(
        derivationPath,
        message
      )
    }catch(error){
      ledgerErrorHandler({ error, rightApp })
    }finally{
      if(global.ledger_icon) global.ledger_icon = null
      if(transport) await transport.close()
    }
    const formatted = Buffer.from(res.signedRawTxBase64, 'base64').slice(0, 64)

    return Buffer.from(formatted).toString('hex')
  }
}
