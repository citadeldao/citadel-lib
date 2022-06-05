import { Psbt } from 'bitcoinjs-lib'
import TrezorConnect from 'trezor-connect'
import { prepareTrezorConnection } from '../../_functions/trezor'

export const signTxByTrezor = async (rawTransaction, derivationPath) => {
  await prepareTrezorConnection()
  const psbt = Psbt.fromBase64(rawTransaction)
  const derivePath = getArrayFromPath(derivationPath)

  const dataTx = {
    coin: 'btc',
    // @ts-ignore
    inputs: psbt.txInputs.map((tx) => ({
      address_n: derivePath,
      prev_index: tx.index,
      // @ts-ignore
      prev_hash: tx.hash
        .toString('hex')
        .match(/.{2}/g)
        .reverse()
        .join(''),
    })),
    // @ts-ignore// @ts-ignore
    outputs: psbt.txOutputs.map((tx) => ({
      // @ts-ignore
      address: tx.address,
      amount: tx.value.toString(),
      script_type: 'PAYTOADDRESS',
    })),
  }

  // let hash
  // psbt.txInputs.forEach(tx => {
  //   hash = tx.hash.toString('hex').match(/.{2}/g).reverse().join('')
  // })
  const res = await TrezorConnect.signTransaction(dataTx)

  return res.payload.serializedTx
}

function getArrayFromPath(str, toZero = true) {
  let arr = str.split('/')
  // @ts-ignore
  arr = arr.filter((n) => !!n && n !== 'm' && n !== 'M')
  // @ts-ignore
  arr = arr.map((n) => {
    if (n[n.length - 1] === `'`) {
      n = n.substr(0, n.length - 1)
      n = parseInt(n)
      if (toZero) {
        n = (n | 0x80000000) >>> 0
      } else {
        n = n | 0x80000000
      }
    } else {
      n = parseInt(n)
    }

    return n
  })

  return arr
}
