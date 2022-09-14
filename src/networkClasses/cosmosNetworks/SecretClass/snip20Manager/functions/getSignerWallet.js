import {
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
  WALLET_TYPES,
  LIB_EVENT_NAMES,
} from '../../../../../constants'
import { getLedgerApp } from '../../../_BaseCosmosClass/signers/getLedgerApp'
import { serializeSignDoc } from './serializeSignDoc'
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
import { getHdDerivationPath } from '../../../../_functions/ledger'
import errors from '../../../../../errors'
import { dispatchLibEvent } from '../../../../../generalFunctions/dispatchLibEvent'
const secp256k1 = require('secp256k1')

export async function getSignerWallet({
  privateKey,
  derivationPath,
  type,
  publicKey,
  address,
  chainId,
  keplr,
}) {
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(type)) {
    privateKey = privateKey.replace('0x', '')
    // create signer wallet by privateKey
    const wallet = await DirectSecp256k1Wallet.fromKey(
      Buffer.from(privateKey, 'hex'),
      'secret'
    )

    return wallet
  }

  if (type === WALLET_TYPES.KEPLR) {
    // get signer
    return await keplr.getOfflineSignerOnlyAmino(chainId)
  }

  // ledger signer
  if (type === WALLET_TYPES.LEDGER) {
    // create signer by ledger
    return {
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
        const message = serializeSignDoc(signDoc)
        const formattedMessage = new TextDecoder('utf-8', {
          fatal: true,
        }).decode(message)
        const ledgerApp = await getLedgerApp()
        const res = await ledgerApp.cosmosApp.sign(
          getHdDerivationPath(derivationPath),
          formattedMessage
        )

        // EVENT: inform the client that it is time to update wallet list
        dispatchLibEvent(LIB_EVENT_NAMES.LEDGER_SIGN_FINISHED)

        if (!res.signature) {
          errors.throwError('LedgerError', {
            message: res.error_message,
            code: res.return_code,
          })
        }

        return {
          signed: signDoc,
          signature: {
            pub_key: {
              type: 'tendermint/PubKeySecp256k1',
              value: Buffer.from(publicKey, 'hex').toString('base64'),
            },
            signature: Buffer.from(
              secp256k1.signatureImport(res.signature)
            ).toString('base64'),
          },
        }
      },
    }
  }
}
