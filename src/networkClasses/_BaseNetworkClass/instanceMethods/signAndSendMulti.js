import api from '../../../api'

export const signAndSendMulti = async function (
  rawTransactions,
  { privateKey, proxy, derivationPath, useAlternativeSigner, transportType = 'usb' }
) {
  const hashes = []
  // sign and send sequentially each transaction
  for (const rawTransaction of rawTransactions) {
    // sign transaction
    const signedTransaction = await this.signTransaction(rawTransaction, {
      privateKey,
      derivationPath,
      useAlternativeSigner,
      transportType
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

    // push hash to hashes array
    const hash = data.hash || data.txhash || data
    hashes.push(hash)
  }

  // return hashes array
  return hashes
}
