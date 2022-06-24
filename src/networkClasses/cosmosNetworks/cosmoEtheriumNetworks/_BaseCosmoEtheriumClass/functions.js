import { bech32 } from 'bech32'

export const getCosmosAddressFromEthAddress = async (ethAddress, prefix) => {
  // dynamic import of large module (for fast init)
  const { Address } = await import('ethereumjs-util')
  const addressBuffer = Address.fromString(ethAddress.toString()).toBuffer()

  return bech32.encode(prefix, bech32.toWords(addressBuffer))
}
