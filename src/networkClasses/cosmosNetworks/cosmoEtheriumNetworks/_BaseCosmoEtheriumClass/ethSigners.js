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
  console.log('test111',rawTransaction);
  // const transaction = JSON.parse(rawTransaction)
  // console.log('test111',transaction);
  console.log(111,TypedDataUtils, SignTypedDataVersion);
  // add global ledger app to avoid ledger reconnect error
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
  // const signatureParsed = Buffer.from(signature).toString('hex');

  return {
    signedTransaction:{
      ...rawTransaction.message,
      signature: signatureParsed,
      publicKey,
    },
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

// {
//   "types": {
//           "EIP712Domain": [
//               {
//                   "name": "name",
//                   "type": "string"
//               },
//               {
//                   "name": "version",
//                   "type": "string"
//               },
//               {
//                   "name": "chainId",
//                   "type": "uint256"
//               },
//               {
//                   "name": "verifyingContract",
//                   "type": "string"
//               },
//               {
//                   "name": "salt",
//                   "type": "string"
//               }
//           ],
//           "Tx": [
//               {
//                   "name": "account_number",
//                   "type": "string"
//               },
//               {
//                   "name": "chain_id",
//                   "type": "string"
//               },
//               {
//                   "name": "fee",
//                   "type": "Fee"
//               },
//               {
//                   "name": "memo",
//                   "type": "string"
//               },
//               {
//                   "name": "msgs",
//                   "type": "Msg[]"
//               },
//               {
//                   "name": "sequence",
//                   "type": "string"
//               }
//           ],
//           "Fee": [
//               {
//                   "name": "amount",
//                   "type": "Coin[]"
//               },
//               {
//                   "name": "gas",
//                   "type": "string"
//               }
//           ],
//           "Coin": [
//               {
//                   "name": "denom",
//                   "type": "string"
//               },
//               {
//                   "name": "amount",
//                   "type": "string"
//               }
//           ],
//           "Msg": [
//               {
//                   "name": "type",
//                   "type": "string"
//               },
//               {
//                   "name": "value",
//                   "type": "MsgValue"
//               }
//           ]
//           ,
// "MsgValue": [
//   {"name": "from_address", "type": "string"},
//   {"name": "to_address", "type": "string"},
//   {"name": "amount", "type": "TypeAmount[]"},
// ],
//       "TypeAmount": [
//           {
//               "name": "denom",
//               "type": "string"
//           },
//           {
//               "name": "amount",
//               "type": "string"
//           }
//       ]
//   },
//   "primaryType": "Tx",
//   "domain": {
//       "name": "Injective Web3",
//       "version": "1.0.0",
//       "chainId": 17,
//       "verifyingContract": "cosmos",
//       "salt": "0"
//   },
//   "message": {
//       "account_number": 8519,
//       "chain_id": "injective-1",
//       "fee": {
//           "amount": [
//               {
//                   "amount": "187998000000000",
//                   "denom": "inj"
//               }
//           ],
//           "gas": "127998"
//       },
//       "memo": "transfer via citadel.one",
//       "msgs": [
//           {
//               "type": "cosmos-sdk/MsgSend",
//               "value": {
//                   "amount": [
//                       {
//                           "amount": "1000000000000000",
//                           "denom": "inj"
//                       }
//                   ],
//                   "from_address": "inj18c5xvk63szp0tu79az7gad25rh5r3txkkgxf9g",
//                   "to_address": "inj18c5xvk63szp0tu79az7gad25rh5r3txkkgxf9g"
//               }
//           }
//       ],
//       "sequence": 0
//   }
// }