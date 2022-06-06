import { signMessageByEd25519 } from './functions'
import * as TezosUtil from '../functions/utils'
import blakejs from 'blakejs'
import {
  WALLET_TYPES,
  PRIVATE_KEY_SIGNER_WALLET_TYPES,
} from '../../../constants'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { TezApp } from '../ledgerApp'
import { signTxByTrezor } from './signTxByTrezor'

export const createMessageSignature = async (
  data,
  { privateKey, derivationPath, type }
) => {
  // privateKey signer
  if (PRIVATE_KEY_SIGNER_WALLET_TYPES.includes(type)) {
    privateKey = TezosUtil.writeKeyWithHint(privateKey, 'edsk')
    const watermark = Buffer.from([3])
    const bytes = Buffer.concat([watermark, Buffer.from(JSON.stringify(data))])
    const hash = blakejs.blake2b(bytes, undefined, 32)
    return signMessageByEd25519(hash, privateKey)
  }

  // ledger signer
  if (type === WALLET_TYPES.LEDGER) {
    if (!global.ledger_tez) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
      global.ledger_tez = new TezApp(transport)
    }

    const { signature } = await global.ledger_tez.signOperation(
      derivationPath,
      `03${Buffer.from(JSON.stringify(data)).toString('hex')}`
    )

    // @ts-ignore
    return signature
  }
  // trezor signer
  if (type === WALLET_TYPES.TREZOR) {
    return await signTxByTrezor({ opOb: data }, derivationPath)
  }
}
