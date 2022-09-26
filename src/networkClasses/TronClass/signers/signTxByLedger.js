import Trx from "@ledgerhq/hw-app-trx";
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'

export const signTxByLedger = async (rawTransaction, derivationPath) => {
  const transport = (await WebHidTransport.isSupported())
  ? await WebHidTransport.create(10000)
  : await TransportWebUSB.create(10000)

  const tronApp = new Trx(transport)
  const signature = await tronApp.signTransaction(derivationPath, rawTransaction.raw_data_hex)
  await transport.close()

  return {
    ...rawTransaction,
    signature: [signature],
};
}