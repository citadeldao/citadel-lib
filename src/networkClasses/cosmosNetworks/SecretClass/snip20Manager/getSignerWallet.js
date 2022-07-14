// import {
//   HARDWARE_SIGNER_WALLET_TYPES,
//   PRIVATE_KEY_SIGNER_WALLET_TYPES,
// } from '../../../../constants'
// import { getHdDerivationPath } from '../../../_functions/ledger'
// import { getLedgerApp } from '../../_BaseCosmosClass/signers/getLedgerApp'
// const { Secp256k1Pen } = require('secretjs')
// const crypto_1 = require('@iov/crypto')
// const secp256k1 = require('secp256k1')

import {
  //HdPath,

  Slip10RawIndex,
} from '@cosmjs/crypto'
// import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
import { LedgerSigner } from '@cosmjs/ledger-amino'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'

// import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from '../../_BaseCosmosClass/signers/getLedgerApp'
// import errors from '../../../../errors'
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






  const ledgerApp = await getLedgerApp()
  console.log('ledgerApp')
  console.dir(ledgerApp)
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
  const ledgerSigner = {
    getAccounts() {
      return [{
        algo: "secp256k1",
        address,
        pubkey: Buffer.from(publicKey, 'hex')
      }]
  },
  signDirect(address, signDoc) {
    const hdPath = getHdDerivationPath(derivationPath)
    const response = await ledgerApp.cosmosApp.sign(hdPath, JSON.stringify(signDoc))
  if (!response.signature) {
    errors.throwError('LedgerError', {
      message: response.error_message,
      code: response.return_code,
    })
  }
  const parsedSignature = secp256k1.signatureImport(response.signature)
    return {
      signed: signDoc,
      signature: Buffer.from(parsedSignature).toString('hex')
      ,
    };
  }
  }
  console.log('*accounts')
  const accounts = ledgerSigner.getAccounts()
  console.dir(accounts)
  
  
  
  
  
  
  
  
  const transport = await TransportWebUSB.create(1000)




  // get hd path
  const hdPathArray = derivationPath.split('/').map((pathItem) => {
    if (pathItem.includes("'")) {
      return Slip10RawIndex.hardened(parseInt(pathItem))
    }
    return Slip10RawIndex.normal(parseInt(pathItem))
  })
  console.log('hdPathArray')
  console.dir(hdPathArray)
  // (derivationPath)



  const wallet = new LedgerSigner(transport, {
    hdPaths: [hdPathArray],
    prefix: 'secret',
  })





  console.log('wallet', wallet)

  return wallet
}
