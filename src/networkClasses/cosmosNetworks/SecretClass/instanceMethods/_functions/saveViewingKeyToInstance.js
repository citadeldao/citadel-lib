import networkClasses from '../../../..'
import { SECRET_NET_KEY } from '../../../../../constants'

export const saveViewingKeyToInstance = (
  token,
  viewingKey,
  viewingKeyType,
  savedViewingKeys
) => {
  savedViewingKeys[token] = {
    token,
    contractAddress:
      networkClasses.getNetworkClass(SECRET_NET_KEY).tokens[token].address,
    viewingKeyType,
    viewingKey,
  }
}
