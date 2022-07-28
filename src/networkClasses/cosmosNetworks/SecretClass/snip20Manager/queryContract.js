import { SecretNetworkClient } from 'secretjs'
import { GRPC_WEB_URL } from '../../../../constants'
// get query messages from node_modules\secretjs\dist\extensions\snip20\types.d.ts
export const queryContract = async ({ contractAddress, query }) => {
  const secretjs = await SecretNetworkClient.create({
    grpcWebUrl: GRPC_WEB_URL,
    chainId: 'secret-4',
  })

  // get contract codeHash
  const codeHash = await secretjs.query.compute.contractCodeHash(
    contractAddress
  )

  // query contract
  return await secretjs.query.compute.queryContract({
    contractAddress,
    codeHash,
    query,
  })
}
