import api from '../../../api'
import { getType } from '../../../helpers/checkArguments'

export const signAndSend = async function (
  rawTransaction,
  { privateKey, proxy, derivationPath, useAlternativeSigner, transportType = 'usb', btcAddress }
) {
  // if type of transaction - array, call signAndSendMulti
  if (getType(rawTransaction.transaction) === 'Array') {
    return await this.signAndSendMulti(rawTransaction.transaction, {
      privateKey,
      proxy,
      derivationPath,
      useAlternativeSigner,
      transportType
    })
  }

  // sign transaction
  const signedTransaction = await this.signTransaction(rawTransaction, {
    privateKey,
    derivationPath,
    useAlternativeSigner,
    transportType,
    btcAddress
  })

  // send signed transaction
  const { data } = await api.requests.sendSignedTransaction({
    signedTransaction,
    net: this.net,
    from: this.address,
    type: this.type,
    mem_tx_id: rawTransaction.mem_tx_id,
    proxy,
  })

  const hash = data.hash || data.txhash || data

  // return Array with hash
  return Array.isArray(hash) ? hash : [hash]
}
