import networkClasses from '../../../'

// TODO: refact!
export function _saveViewingKeyToInstance(token, viewingKey, type) {
  if (!viewingKey) {
    delete this.savedViewingKeys[token]
  } else {
    const networkClass = networkClasses.getNetworkClass(this.net)
    this.savedViewingKeys[token] = {
      token,
      contractAddress: networkClass.tokens[token].address,
      viewingKeyType: type,
      viewingKey,
    }
  }
}
