// import {
//   HARDWARE_SIGNER_WALLET_TYPES,
//   PRIVATE_KEY_SIGNER_WALLET_TYPES,
// } from '../../../../constants'
// import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from '../../_BaseCosmosClass/signers/getLedgerApp'
// const { Secp256k1Pen } = require('secretjs')
// const crypto_1 = require('@iov/crypto')
// const secp256k1 = require('secp256k1')

// import {
//   //HdPath,

//   Slip10RawIndex,
// } from '@cosmjs/crypto'
// // import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
// import TransportWebUSB from '@ledgerhq/hw-transport-webusb'

import { getHdDerivationPath } from '../../../_functions/ledger'
import errors from '../../../../errors'
// const secp256k1 = require('secp256k1')

// ledger signer get from
// https://github.com/cosmos/cosmjs/blob/main/packages/ledger-amino/src/ledgersigner.ts

// privateKey signer
// https://github.com/cosmos/cosmjs/blob/5bd6c39226/packages/proto-signing/src/directsecp256k1wallet.ts#L40

export async function getSignerWallet({
  privateKey,
  derivationPath,
  type,
  publicKey,
  address,
}) {
  console.log({ privateKey, derivationPath, type, publicKey, address })

  // // create signer wallet by privateKey
  // const wallet = await DirectSecp256k1Wallet.fromKey(
  //   Buffer.from(privateKey, 'hex'),
  //   'secret'
  // )

  // const hdPath = getHdDerivationPath(derivationPath)
  // const response = await ledgerApp.cosmosApp.sign(hdPath, JSON.stringify(data))
  // if (!response.signature) {
  //   errors.throwError('LedgerError', {
  //     message: response.error_message,
  //     code: response.return_code,
  //   })
  // }
  // const parsedSignature = secp256k1.signatureImport(response.signature)
  // return Buffer.from(parsedSignature).toString('hex')

  // create signer by ledger
  const wallet = {
    getAccounts() {
      return [
        {
          algo: 'secp256k1',
          address,
          pubkey: Buffer.from(publicKey, 'hex'),
        },
      ]
    },
    async signAmino(...args) {
      // first arg is address
      const signDoc = args[1]
      console.log('signDoc', signDoc)
      console.log(1, signDoc)
      const hdPath = getHdDerivationPath(derivationPath)
      console.log(2, hdPath)

      const message = serializeSignDoc(signDoc)

      console.log('message', message)
      // return {
      //   signed: signDoc,
      //   signature: encodeSecp256k1Signature(accountForAddress.pubkey, signature),
      // };

      const ledgerApp = await getLedgerApp()
      const response = await ledgerApp.cosmosApp.sign(hdPath, message)
      if (!response.signature) {
        errors.throwError('LedgerError', {
          message: response.error_message,
          code: response.return_code,
        })
      }
      console.log('response', response)
      const parsedSignature = encodeSecp256k1Signature(
        Buffer.from(publicKey, 'hex'),
        response.signature
      )

      console.log('parsedSignature', parsedSignature)
      return {
        signed: signDoc,
        signature: parsedSignature,
      }
    },
  }

  console.log('wallet', wallet)

  return wallet
}

const sortedObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(sortedObject)
  }
  const sortedKeys = Object.keys(obj).sort()
  const result = {}
  // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
  sortedKeys.forEach((key) => {
    result[key] = sortedObject(obj[key])
  })
  return result
}

const sortedJsonStringify = (obj) => {
  return JSON.stringify(sortedObject(obj))
}

const toUtf8 = (str) => {
  return new TextEncoder().encode(str)
}

const serializeSignDoc = (signDoc) => {
  return toUtf8(sortedJsonStringify(signDoc))
}

const encodeSecp256k1Signature = (pubkey, signature) => {
  return {
    pub_key: encodeSecp256k1Pubkey(pubkey),
    signature: signature.toString('base64'),
  }
}

const encodeSecp256k1Pubkey = (pubkey) => {
  return {
    type: 'tendermint/PubKeySecp256k1',
    value: pubkey.toString('base64'),
  }
}
