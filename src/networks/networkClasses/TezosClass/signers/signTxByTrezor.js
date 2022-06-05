import TrezorConnect from 'trezor-connect'
import { prepareTrezorConnection } from '../../_functions/trezor'
import { base58CheckDecode } from '../../_functions/crypto'

export const signTxByTrezor = async (
  { opbytes, opOb, derrivePath },
  derivationPath
) => {
  await prepareTrezorConnection()
  const reveal = opOb.contents.find((item) => item.kind === 'reveal')
  if (reveal) {
    reveal.fee = +reveal.fee
    reveal.counter = +reveal.counter
    reveal.amount = +reveal.amount
    reveal.gas_limit = +reveal.gas_limit
    reveal.storage_limit = +reveal.storage_limit
  }

  const transaction = opOb.contents.find((item) => item.kind === 'transaction')
  if (transaction) {
    transaction.fee = +transaction.fee
    transaction.counter = +transaction.counter
    transaction.gas_limit = +transaction.gas_limit
    transaction.storage_limit = +transaction.storage_limit
    transaction.amount = +transaction.amount
  }

  const delegation = opOb.contents.find((item) => item.kind === 'delegation')
  if (delegation) {
    delegation.fee = +delegation.fee
    delegation.counter = +delegation.counter
    delegation.gas_limit = +delegation.gas_limit
    delegation.storage_limit = +delegation.storage_limit
  }

  const signed = await TrezorConnect.tezosSignTransaction(
    JSON.parse(
      JSON.stringify({
        path: derrivePath || derivationPath,
        branch: opOb.branch,
        operation: {
          reveal,
          transaction,
          delegation,
        },
      })
    )
  )

  if (signed.success) {
    const sign = base58CheckDecode(
      Buffer.from([9, 245, 205, 134, 18]),
      signed.payload.signature
    )

    return { sopbytes: opbytes + Buffer.from(sign).toString('hex') }
  }
}
