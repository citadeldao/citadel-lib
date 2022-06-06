import { bech32 } from 'bech32'
import { Address } from 'ethereumjs-util'

export const getCosmosAddressFromEthAddress = (ethAddress, prefix) => {
  const addressBuffer = Address.fromString(ethAddress.toString()).toBuffer()

  return bech32.encode(prefix, bech32.toWords(addressBuffer))
}
