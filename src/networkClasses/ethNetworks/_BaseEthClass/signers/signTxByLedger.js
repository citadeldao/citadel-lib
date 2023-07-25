import { ethereumHardwareSigner } from './functions'
import { getLedgerTransport } from "../../../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./../functions"
// TODO: update Ledger signer with resolution!
/*
hw-app-eth: signTransaction(path, rawTxHex, resolution): please provide the 'resolution' parameter. See https://github.com/LedgerHQ/ledgerjs/blob/master/packages/hw-app-eth/README.md – the previous signature is deprecated and providing the 3rd 'resolution' parameter explicitly will become mandatory so you have the control on the resolution and the fallback mecanism (e.g. fallback to blind signing or not).// Possible solution:
 + import ledgerService from '@ledgerhq/hw-app-eth/lib/services/ledger';
 + const resolution = await ledgerService.resolveTransaction(rawTxHex);
*/
export const signTxByLedger = async (rawTransaction, derivationPath, net, rightApp, transportType) => {
  // dynamic import of large module (for fast init)
  const { default: EthApp } = await import('@ledgerhq/hw-app-eth')

  // add global ledger app to avoid ledger reconnect error
  let transport = null
  if (!global[`ledger_${net}`]) {
    transport = await getLedgerTransport(transportType)
    global[`ledger_${net}`] = new EthApp(transport)
  }

  const signFunction = async (hash) => {
    try {
      const { v, r, s } = await global[`ledger_${net}`].signTransaction(
        derivationPath,
        hash.toString('hex')
      )
      if (v && r && s) {
        return { recoveryParam: v, r, s }
      }else{
        const error = new Error('invalid data')
        error.statusCode = 28160
        throw (error)
      }
    } catch (error) {
      if(error.name.includes('EthAppPleaseEnableContractData')){
        error.statusCode = 28160
      }
      // TODO: check correct error handling
      // const error = new Error(err.message)
      // error.code = err.statusCode
      // throw error
      ledgerErrorHandler({ error, rightApp })
    }finally{
      if(transportType === 'usb'){
        if(global[`ledger_${net}`]) global[`ledger_${net}`] = null
        if(transport) await transport.close()
      }
    }
  }

  return ethereumHardwareSigner(
    {
      ...rawTransaction,
    },
    signFunction,
    false
  )
}
