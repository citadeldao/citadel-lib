import state from '../state'

export const checkWalletPK = (wallet) => {
  if (
    wallet.privateKey ||
    wallet.privKey ||
    wallet.privatekey ||
    wallet.privkey ||
    wallet.mnemonic
  ) {
    state.getState('debug') && alert(`Warning! PK! ID: ${wallet.id}`)
    console.error(`Can't pass wallet with PK, ID: ${wallet.id}`)
    delete wallet.privateKey
    delete wallet.privKey
    delete wallet.privatekey
    delete wallet.privkey
    delete wallet.mnemonic
  }
}
