import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import EthApp from '@ledgerhq/hw-app-eth'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { ethereumHardwareSigner } from './functions'
// TODO: update Ledger signer with resolution!
/*
hw-app-eth: signTransaction(path, rawTxHex, resolution): please provide the 'resolution' parameter. See https://github.com/LedgerHQ/ledgerjs/blob/master/packages/hw-app-eth/README.md – the previous signature is deprecated and providing the 3rd 'resolution' parameter explicitly will become mandatory so you have the control on the resolution and the fallback mecanism (e.g. fallback to blind signing or not).// Possible solution:
 + import ledgerService from '@ledgerhq/hw-app-eth/lib/services/ledger';
 + const resolution = await ledgerService.resolveTransaction(rawTxHex);
*/
export const signTxByLedger = async (rawTransaction, derivationPath, net) => {
  // now always use new instance of app (), without global
  if (!global[`ledger_${net}`]) {
  const transport = (await WebHidTransport.isSupported())
    ? await WebHidTransport.create(10000)
    : await TransportWebUSB.create(10000)
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
      }
    } catch (err) {
      // TODO: check correct error handling
      const error = new Error(err.message)
      error.code = err.statusCode
      throw error
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
