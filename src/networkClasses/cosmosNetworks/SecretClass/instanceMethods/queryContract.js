import snip20Manager from '../snip20Manager'

export async function queryContract({
    contractAddress,
    query
} = {}) {
  // execute querycontract
  const response = await snip20Manager.queryContract({
    contractAddress,
    query,
    address: this.address,
    type: this.type,
  })

  return response
}