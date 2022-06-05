import api from '../../../../api'

export default async function (
  rawTransactions,
  { privateKey, proxy, derivationPath }
) {
  const hashes = []

  for (const rawTransaction of rawTransactions) {
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

    const hash = data.hash || data.txhash || data
    hashes.push(hash)
  }
  return hashes
}
