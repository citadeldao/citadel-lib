import networkClasses from '../networkClasses'
import state from '../state'
import { WALLET_TYPES, CACHE_NAMES } from '../constants'
import { addCreatedWallet } from './addCreatedWallet'
import { getWalletList } from './getWalletList'
import { updateWallet } from './updateWallet'

// used to set walletList by the client
export const setWalletList = async (
  walletList,
  { addNotAddedWallets } = {}
) => {
  // FORMAT INITIAL WALLETS
  const initialWallets = walletList
    // filter unsupported wallet
    .filter(({ net }) =>
      state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS).includes(net)
    )
    // format addresses for correct compare
    .map((initialWallet) => ({
      ...initialWallet,
      address: networkClasses
        .getNetworkClass(initialWallet.net)
        .formatAddress(initialWallet.address),
    }))
    // format publicKeys (convert old (Buffer) public key formats to string)
    .map((initialWallet) => ({
      ...initialWallet,
      publicKey: networkClasses
        .getNetworkClass(initialWallet.net)
        .formatPublicKeyFromBuffer(initialWallet.publicKey),
    }))

  // UPDATE STORAGE WALLETS
  // get existing storage wallets
  const storageWalletList = getWalletList()
  storageWalletList.map((storageWallet) => {
    // find storageWalletList in initialWallets array
    const existingInitialWallet = initialWallets.find(
      (initialWallet) =>
        initialWallet.net === storageWallet.net &&
        initialWallet.address === storageWallet.address
    )
    // if storageWallet found in initialWallets
    if (existingInitialWallet) {
      // update storageWallet by existingInitialWallet
      updateWallet({
        walletId: storageWallet.id,
        newWalletInfo: {
          // TODO: если savedViewingKeys нету или нулл, оставить старый ...{()}
          type: existingInitialWallet.type || WALLET_TYPES.PUBLIC_KEY,
          // add publicKey if it exist
          ...(existingInitialWallet.publicKey && {
            publicKey: existingInitialWallet.publicKey,
          }),
          // add privateKeyHash if it exist
          ...(existingInitialWallet.privateKeyHash && {
            privateKeyHash: existingInitialWallet.privateKeyHash,
          }),
          // add savedViewingKeys if it exist
          ...(existingInitialWallet.savedViewingKeys && {
            savedViewingKeys: existingInitialWallet.savedViewingKeys,
          }),
          // add hashedMnemonic if it exist (for extension)
          ...(existingInitialWallet.hashedMnemonic && {
            hashedMnemonic: existingInitialWallet.hashedMnemonic,
          }),
        },
      })
    }

    // if storageWallet not found in initialWallets
    if (!existingInitialWallet) {
      // update storageWallet as public
      updateWallet({
        walletId: storageWallet.id,
        newWalletInfo: {
          type: WALLET_TYPES.PUBLIC_KEY,
          publicKey: null,
          privateKeyHash: null,
          savedViewingKeys: {},
        },
      })
    }
  })

  // ADD NOT ADDED WALLETS
  if (addNotAddedWallets) {
    await Promise.all(
      initialWallets.map(async (initialWallet) => {
        if (
          !storageWalletList.find(
            (storageWallet) =>
              storageWallet.net === initialWallet.net &&
              storageWallet.address === initialWallet.address
          )
        ) {
          await addCreatedWallet({
            createdWallet: initialWallet,
            checkExistence: false,
          })
        }
      })
    )
  }
}
