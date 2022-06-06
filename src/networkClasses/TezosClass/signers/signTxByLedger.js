import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { TezApp } from '../ledgerApp'

export const signTxByLedger = async (rawTransaction, derivationPath) => {
  // add globa ledger app to avoid ledger reconnect error
  if (!global.ledger_tez) {
    const transport = (await WebHidTransport.isSupported())
      ? await WebHidTransport.create(10000)
      : await TransportWebUSB.create(10000)
    global.ledger_tez = new TezApp(transport)
  }

  const { opbytes } = rawTransaction

  try {
    const { signature } = await global.ledger_tez.signOperation(
      derivationPath,
      `03${opbytes}`
    )

    return { sopbytes: opbytes + signature }
  } catch (err) {
    console.error(err)
  }
}
