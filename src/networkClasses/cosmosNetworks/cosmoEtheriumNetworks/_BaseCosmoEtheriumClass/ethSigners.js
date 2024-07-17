import {getLedgerTransport} from "../../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "../../../ethNetworks/_BaseEthClass/functions"

const keccak256 = require('keccak256')


const domainHash = async (message) => {
  // dynamic import of large module (for fast init)
  const { TypedDataUtils, SignTypedDataVersion } = await import(
    '@metamask/eth-sig-util'
  )

  return TypedDataUtils.hashStruct(
    'EIP712Domain',
    message.domain,
    message.types,
    SignTypedDataVersion.V4
  )
}

const messageHash = async (message) => {
  const { TypedDataUtils, SignTypedDataVersion } = await import(
    '@metamask/eth-sig-util'
  )
  return TypedDataUtils.hashStruct(
    message.primaryType,
    message.message,
    message.types,
    SignTypedDataVersion.V4
  )
}

export const signTxByLedger = async (
  rawTransaction,
  derivationPath,
  publicKey,
  rightApp,
  transportType
) => {
  let transport = null
  const transaction = rawTransaction?.eip712 || rawTransaction

  if (!global.ledger_eth && !global.ledger_bsc) {
    transport = await getLedgerTransport()
    // dynamic import of large module (for fast init)
    const { default: EthApp } = await import('@ledgerhq/hw-app-eth')
    global.ledger_eth = new EthApp(transport)
  }
  
  let resp
  try{
      resp = await global.ledger_eth.signEIP712HashedMessage(
      derivationPath,
      Buffer.from(await domainHash(transaction)).toString('hex'),
      Buffer.from(await messageHash(transaction)).toString('hex')
    )
  }catch(error){
    ledgerErrorHandler({ error, rightApp })
  }finally{
    if(transportType === 'usb'){
      if(global.ledger_eth) global.ledger_eth = null
      if(global.ledger_bsc) global.ledger_bsc = null
      if(transport) await transport.close()
    }
  }
  

  const combined = `${resp.r}${resp.s}${resp.v.toString(16)}`
  const signature = combined.startsWith('0x') ? combined.slice(2) : combined

  return {
    ...transaction.message,
    signature,
    publicKey,
    mode: 'ledger',
    isTyped: true,
  }
}

export const signTxByPrivateKey = async (
  stdSignMsg,
  publicKeyHex,
  privateKeyHex
) => {
  const msgHash = keccak256(stdSignMsg.bytes)
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const { signature } = secp256k1.ecdsaSign(
    msgHash,
    Buffer.from(privateKeyHex, 'hex')
  )

  return {
    ...(stdSignMsg.json || stdSignMsg.message),
    signature: Buffer.from(signature).toString('hex'),
    publicKey: publicKeyHex,
  }
}

export const createMessageSignature = async (message, privateKeyHex) => {
  const msgHash = keccak256(JSON.stringify(message))
  // dynamic import for guge module
  const { default: secp256k1 } = await import('secp256k1')
  const { signature } = secp256k1.ecdsaSign(
    msgHash,
    Buffer.from(privateKeyHex, 'hex')
  )

  return Buffer.from(signature).toString('hex')
}
