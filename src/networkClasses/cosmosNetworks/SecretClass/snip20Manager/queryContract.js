import { getSecretClient } from './functions/getSecretClient'

// get query messages from node_modules\secretjs\dist\extensions\snip20\types.d.ts
export const queryContract = async ({
  contractAddress,
  query,
  address,
  type,
}) => {
  // prepare secret client
  const secretjs = await getSecretClient({
    address,
    type,
    readOnly: true,
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
