import api from '../../../api'
import { getType } from '../../../helpers/checkArguments'

export const signAndSend = async function (
  rawTransaction,
  { privateKey, proxy, derivationPath }
) {
  // if type of transaction - array, call signAndSendMulti
  if (getType(rawTransaction.transaction) === 'Array') {
    return await this.signAndSendMulti(rawTransaction.transaction, {
      privateKey,
      proxy,
      derivationPath,
    })
  }

  // sign transaction
  const signedTransaction = await this.signTransaction(rawTransaction, {
    privateKey,
    derivationPath,
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

  // return Array with hash
  return [data.hash || data.txhash || data]
}
