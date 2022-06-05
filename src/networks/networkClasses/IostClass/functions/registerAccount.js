import api from '../../../../api'
import bs58 from 'bs58'
import { sleep } from '../../../../helpers/sleep'
import errors from '../../../../errors'

export const registerAccount = async (account, net, publicKey) => {
  const faucetResponse = await api.requests.faucetSignUp({
    name: account,
    publicKey: bs58.encode(Buffer.from(publicKey, 'hex')),
    net,
  })

  let status
  while (status !== 'ok') {
    const { data } = await api.requests.checkTransaction({
      net,
      hash: faucetResponse.data,
    })
    status = data.status
    status === 'failed' &&
      errors.throwError('LibraryError', {
        message: `Iost register account faild. ${data.reason}`,
      })
    status !== 'ok' && (await sleep(500))
  }
}
