import { sha3_256 as sha3256 } from 'js-sha3'
import {
  WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../../constants'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { IconApp } from '../ledgerApp'

export async function createMessageSignature(
  message,
  { privateKey, derivationPath, type }
) {
  // privateKey signers
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(type)) {
    // dynamic import for guge module
    const { default: secp256k1 } = await import('secp256k1')
    const result = secp256k1.ecdsaSign(
      Buffer.from(sha3256.update(message).hex(), 'hex'),
      Buffer.from(privateKey, 'hex')
    )
    return Buffer.from(result.signature).toString('hex')
  }
  // ledger signers
  if (type === WALLET_TYPES.LEDGER) {
    // add global ledger app to avoid ledger reconnect error
    if (!global.ledger_icon) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
      global.ledger_icon = new IconApp(transport)
    }

    const { signedRawTxBase64 } = await global.ledger_icon.signTransaction(
      derivationPath,
      message
    )
    const formatted = Buffer.from(signedRawTxBase64, 'base64').slice(0, 64)

    return Buffer.from(formatted).toString('hex')
  }
}
