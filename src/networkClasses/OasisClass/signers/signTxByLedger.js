import { Psbt } from 'bitcoinjs-lib'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import BtcApp from '@ledgerhq/hw-app-btc'

export const signTxByLedger = async (rawTransaction, derivationPath) => {
  if (!global.ledger_btc) {
    const transport = (await WebHidTransport.isSupported())
      ? await WebHidTransport.create(10000)
      : await TransportWebUSB.create(10000)
    global.ledger_btc = new BtcApp(transport)
  }
  const psbt = Psbt.fromBase64(rawTransaction)
  const tx_data = {
    inputs: psbt.txInputs.map((input, index) => {
      // @ts-ignore
      const raw = psbt.data.inputs[index].nonWitnessUtxo.toString('hex')
      const isSegwit = raw.substring(8, 12) === '0001'

      return [global.ledger_btc.splitTransaction(raw, isSegwit), input.index]
    }),
    associatedKeysets: new Array(psbt.txInputs.length).fill(derivationPath),
    outputScriptHex: await global.ledger_btc
      .serializeTransactionOutputs(
        global.ledger_btc.splitTransaction(psbt.__CACHE.__TX.toHex())
      )
      .toString('hex'),
    // to prevent error "... inclides()" in @ledgerhq/hw-app-btc version 6.23
    additionals: [],
  }
  const res = await global.ledger_btc.createPaymentTransactionNew(tx_data)
  return res
}
