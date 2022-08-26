import * as oasis from '@oasisprotocol/client'

export const generateContext = async ()=> {
    const nic = new oasis.client.NodeInternal('https://grpc.oasis.dev')
    const chainContext = await nic.consensusGetChainContext()
    let TRANSACTION_SIGNATURE_CONTEXT = 'oasis-core/consensus: tx'
    const context = await oasis.signature.combineChainContext(TRANSACTION_SIGNATURE_CONTEXT, chainContext)
    return context
}
export const bufFromU8 = (u8)=> {
    return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength);
}
export const u8FromBuf = (buf)=> {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

export const tranformTransaction = async (transaction)=> {
    if(transaction.body.amount){
        transaction.body.amount = new Uint8Array(Object.values(transaction.body.amount));
      }
    
      if(transaction.body.shares){
        transaction.body.shares = new Uint8Array(Object.values(transaction.body.shares));
      }
      
      if(transaction.body.to){
        transaction.body.to = new Uint8Array(Object.values(transaction.body.to));
      }
    
      if(transaction.body.account){
        transaction.body.account = new Uint8Array(Object.values(transaction.body.account));
      }
      transaction.fee.amount = new Uint8Array(Object.values([0]));
      let tx = await oasis.misc.toCBOR(transaction)
      return tx
}