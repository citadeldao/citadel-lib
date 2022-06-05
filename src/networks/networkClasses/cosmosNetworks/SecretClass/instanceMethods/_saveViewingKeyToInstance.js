import networks from '../../../..'

export function _saveViewingKeyToInstance(token, viewingKey, type) {
  if (!viewingKey) {
    delete this.savedViewingKeys[token]
  } else {
    const networkClass = networks.getNetworkClass(this.net)
    this.savedViewingKeys[token] = {
      token,
      contractAddress: networkClass.tokens[token].address,
      viewingKeyType: type,
      viewingKey,
    }
  }
}
