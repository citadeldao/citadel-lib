import { generateHashKey, toRawTransaction } from './functions'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import IconApp from '../ledgerApp'

export const signTxByLedger = async (rawTransaction, derivationPath) => {
  if (!global.ledger_icon) {
    const transport = (await WebHidTransport.isSupported())
      ? await WebHidTransport.create(10000)
      : await TransportWebUSB.create(10000)
    global.ledger_icon = new IconApp(transport)
  }

  const rawTx = toRawTransaction(rawTransaction)
  const phraseToSign = generateHashKey(rawTx)
  const { signedRawTxBase64 } = await global.ledger_icon.signTransaction(
    derivationPath,
    phraseToSign
  )

  return { ...rawTx, signature: signedRawTxBase64 }
}
