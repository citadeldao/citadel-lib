import api from '../../../../api'
import { getType } from '../../../../helpers/checkArguments'
export default async function (
  rawTransaction,
  { privateKey, proxy, derivationPath }
) {
  if (getType(rawTransaction.transaction) === 'Array') {
    return await this.signAndSendMulti(rawTransaction.transaction, {
      privateKey,
      proxy,
      derivationPath,
    })
  }

  const signedTransaction = await this.signTransaction(rawTransaction, {
    privateKey,
    derivationPath,
  })

  const { data } = await api.requests.sendSignedTransaction({
    signedTransaction,
    net: this.net,
    from: this.address,
    type: this.type,
    mem_tx_id: rawTransaction.mem_tx_id,
    proxy,
  })
  return data.hash || data.txhash || data
}
