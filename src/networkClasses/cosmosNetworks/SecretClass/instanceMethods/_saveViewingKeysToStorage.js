import walletsManager from '../../../../walletsManager'

// TODO: refact!
export function _saveViewingKeysToStorage() {
  walletsManager.updateWallet({
    walletId: this.id,
    newWalletInfo: { savedViewingKeys: this.savedViewingKeys },
  })
}
