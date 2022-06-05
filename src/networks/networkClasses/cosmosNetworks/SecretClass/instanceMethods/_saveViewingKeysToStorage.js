import storage from '../../../../../storage/'

export function _saveViewingKeysToStorage() {
  storage.wallets.updateWallet({
    walletId: this.id,
    newWalletInfo: { savedViewingKeys: this.savedViewingKeys },
  })
}
