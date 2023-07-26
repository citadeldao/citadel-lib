import {
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
  WALLET_TYPES,
  LIB_EVENT_NAMES,
} from '../../../../../constants'
//import { getLedgerApp } from '../../../_BaseCosmosClass/signers/getLedgerApp'
import { getLedgerTransport } from "../../../../../ledgerTransportProvider";
import { serializeSignDoc } from './serializeSignDoc'
import { getHdDerivationPath } from '../../../../_functions/ledger'
import errors from '../../../../../errors'
import { dispatchLibEvent } from '../../../../../generalFunctions/dispatchLibEvent'

export async function getSignerWallet({
  privateKey,
  derivationPath,
  transportType,
  type,
  publicKey,
  address,
  chainId,
  keplr,
}) {
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(type)) {
    // dynamic import of large module (for fast init)
    const { DirectSecp256k1Wallet } = await import(
      '@cosmjs/proto-signing'
    )

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
    // dynamic import for guge module
    const { default: secp256k1 } = await import('secp256k1')
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
        // EVENT: inform the client that it is time to update wallet list
        dispatchLibEvent(LIB_EVENT_NAMES.LEDGER_SIGNING_STARTED)
        // first arg is address
        const signDoc = args[1]
        const message = serializeSignDoc(signDoc)
        const formattedMessage = new TextDecoder('utf-8', {
          fatal: true,
        }).decode(message)

        const { default: CosmosApp } = await import('ledger-cosmos-js')
        const transport = await getLedgerTransport(transportType)
        const ledgerApp = new CosmosApp(transport)
        // const ledgerApp = await getLedgerApp()
        const res = await ledgerApp.sign(
          getHdDerivationPath(derivationPath),
          formattedMessage
        )

        // EVENT: inform the client that it is time to update wallet list
        dispatchLibEvent(LIB_EVENT_NAMES.LEDGER_SIGNING_FINISHED)

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
