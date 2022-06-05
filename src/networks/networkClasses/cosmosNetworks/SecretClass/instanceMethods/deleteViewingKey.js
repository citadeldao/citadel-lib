export async function deleteViewingKey(token) {
  this._saveViewingKeyToInstance(token, null)
  this._saveViewingKeysToStorage()
  // updateSubTokenBalances
  await this.updateSubtokensList([token])
}
