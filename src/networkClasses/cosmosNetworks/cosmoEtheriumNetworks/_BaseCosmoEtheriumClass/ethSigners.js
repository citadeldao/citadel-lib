const secp256k1 = require('secp256k1')
const keccak256 = require('keccak256')

import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import EthApp from '@ledgerhq/hw-app-eth'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { TypedDataUtils, SignTypedDataVersion } from '@metamask/eth-sig-util';

const domainHash = (message) => {
  return TypedDataUtils.hashStruct('EIP712Domain', message.domain, message.types, SignTypedDataVersion.V4);
};

const messageHash = (message) => {
  return TypedDataUtils.hashStruct(
    message.primaryType,
    message.message,
    message.types,
    SignTypedDataVersion.V4
  );
};



export const signTxByLedger = async (rawTransaction, derivationPath, publicKey) => {
  if (!global.ledger_eth && !global.ledger_bsc) {
    const transport = (await WebHidTransport.isSupported())
      ? await WebHidTransport.create(10000)
      : await TransportWebUSB.create(10000)
    global.ledger_eth = new EthApp(transport)
  }
  const { v, r, s } = await global.ledger_eth.signEIP712HashedMessage(
    derivationPath,
    Buffer.from(domainHash(rawTransaction)).toString('hex'),
    Buffer.from(messageHash(rawTransaction)).toString('hex'),
  );

  const combined = `${r}${s}${v.toString(16)}`;
  const signature = combined.startsWith('0x') ? combined.slice(2) : combined;

  return {
    ...rawTransaction.message,
    signature,
    publicKey,
    mode: 'ledger',
    isTyped: true,
  };
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
