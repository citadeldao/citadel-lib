import { signMessageByEd25519 } from './functions'
import * as TezosUtil from '../functions/utils'
import blakejs from 'blakejs'
import {
  WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../../constants'
import { TezApp, ledgerErrorHandler } from '../ledgerApp'
import { signTxByTrezor } from './signTxByTrezor'
import { getLedgerTransport } from "../../../ledgerTransportProvider";

export const createMessageSignature = async (
  data,
  { privateKey, derivationPath, type, rightApp }
) => {
  // privateKey signer
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(type)) {
    privateKey = TezosUtil.writeKeyWithHint(privateKey, 'edsk')
    const watermark = Buffer.from([3])
    const bytes = Buffer.concat([watermark, Buffer.from(JSON.stringify(data))])
    const hash = blakejs.blake2b(bytes, undefined, 32)
    return await signMessageByEd25519(hash, privateKey)
  }

  // ledger signer
  if (type === WALLET_TYPES.LEDGER) {
    let transport 
    if (!global.ledger_tez) {
      transport = await getLedgerTransport()
      global.ledger_tez = new TezApp(transport)
    }
    try{
      const { signature } = await global.ledger_tez.signOperation(
        derivationPath,
        `03${Buffer.from(JSON.stringify(data)).toString('hex')}`
      )
  
      // @ts-ignore
      return signature
    }catch(error){
      ledgerErrorHandler({ error, rightApp})
    }finally{
      if(global.ledger_tez) global.ledger_tez = null
      if(transport) await transport.close()
    }
  }
  // trezor signer
  if (type === WALLET_TYPES.TREZOR) {
    return await signTxByTrezor({ opOb: data }, derivationPath)
  }
}
