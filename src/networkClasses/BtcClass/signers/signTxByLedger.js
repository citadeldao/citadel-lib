import { getLedgerTransport } from "../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./functions"

export const signTxByLedger = async (rawTransaction, derivationPath, rightApp) => {
  // dynamic import of large module (for fast init)
  const { default: BtcApp } = await import('@ledgerhq/hw-app-btc')
  // add global btc ledger app to avoid ledger reconnect error

  let transport
  if (!global.ledger_btc) {
    transport = await getLedgerTransport()
    global.ledger_btc = new BtcApp({ transport, currency: "bitcoin" });
  }
  // dynamic import of large module (for fast init)
  const { Psbt } = await import('bitcoinjs-lib')
  // sign transaction
  const psbt = Psbt.fromBase64(rawTransaction)
  try{
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
  
    // return signed transaction
    return await global.ledger_btc.createPaymentTransaction(tx_data)
  }catch(error){
    ledgerErrorHandler({ error, rightApp })
  }finally{
    if(global.ledger_btc) global.ledger_btc = null
    if(transport) await transport.close()
  }
  
}
