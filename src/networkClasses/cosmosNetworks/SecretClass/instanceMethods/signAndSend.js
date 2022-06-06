import { signAndSend as baseSignAndSend } from '../../../_BaseNetworkClass/instanceMethods/signAndSend'

export async function signAndSend(
  rawTransaction,
  { privateKey, proxy, derivationPath }
) {
  // if instructions have been received to send a transaction from the client
  if (rawTransaction.executeOnClient) {
    const { instanceMethod, methodArguments } = rawTransaction.executeOnClient
    {
      privateKey, proxy, derivationPath
    }
    return await this[instanceMethod]({
      ...methodArguments,
      privateKey,
      derivationPath,
    })
  }

  // instead "super"
  return await baseSignAndSend.call(this, rawTransaction, {
    privateKey,
    proxy,
    derivationPath,
  })
}
