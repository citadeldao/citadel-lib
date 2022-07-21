import { SecretNetworkClient } from 'secretjs'
import { GRPC_WEB_URL } from '../../../../constants'

export async function getTokenBalance(
  address,
  contractAddress,
  decimals,
  viewingKey
) {
  // prepare readOnly secret client
  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl: GRPC_WEB_URL,
    chainId: 'secret-4',
  })

  // get contract codeHash
  const codeHash = await secretjs.query.compute.contractCodeHash(
    contractAddress
  )

  try {
    // get snip20 balance
    const resp = await secretjs.query.snip20.getBalance({
      address,
      contract: {
        address: contractAddress,
        codeHash,
      },
      auth: {
        key: viewingKey,
      },
    })

    if (resp.balance && resp.balance.amount)
      return {
        error: false,
        amount: resp.balance.amount / 10 ** decimals,
      }

    throw new Error(resp?.viewing_key_error?.msg || 'Unknow VK Error')
  } catch (err) {
    return { error: err, amount: null }
  }
}
