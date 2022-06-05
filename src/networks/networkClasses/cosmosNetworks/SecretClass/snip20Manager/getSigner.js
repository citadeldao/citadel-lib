import {
  HARDWARE_SIGNER_WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../../../../constants'
import { getHdDerivationPath } from '../../../_functions/ledger'
import { getLedgerApp } from '../../_BaseCosmosClass/signers/getLedgerApp'
const { Secp256k1Pen } = require('secretjs')
const crypto_1 = require('@iov/crypto')
const secp256k1 = require('secp256k1')

export async function getSigner({
  privateKey,
  derivationPath,
  type,
  publicKey,
}) {
  let signer

  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(type)) {
    privateKey = privateKey.replace('0x', '')
    const privateKeyBuffer = Buffer.from(privateKey, 'hex')
    const uncompressedPk = (
      await crypto_1.Secp256k1.makeKeypair(privateKeyBuffer)
    ).pubkey
    const pubkey = crypto_1.Secp256k1.compressPubkey(uncompressedPk)
    const signingPen = new Secp256k1Pen(privateKeyBuffer, pubkey)
    signer = (signBytes) => {
      const signed = signingPen.sign(signBytes)
      return signed
    }
  }

  if (HARDWARE_SIGNER_WALLET_TYPES.includes(type)) {
    signer = async (signBytes) => {
      const ledgerApp = await getLedgerApp()
      const res = await ledgerApp.cosmosApp.sign(
        getHdDerivationPath(derivationPath),
        signBytes
      )

      return {
        pub_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: Buffer.from(publicKey, 'hex').toString('base64'),
        },
        signature: Buffer.from(
          secp256k1.signatureImport(res.signature)
        ).toString('base64'),
      }
    }
  }

  return signer
}
