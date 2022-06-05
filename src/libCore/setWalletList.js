import storage from '../storage'
import { WALLET_TYPES } from '../constants'
import { getType } from '../helpers/checkArguments'
import networks from '../networks'
import state from '../state'
import addCreatedWallet from './addCreatedWallet'

// set wallets by initialWallets list
export default async (wallets, { addNotAddedWallets } = {}) => {
  // FORMAT INITIAL WALLETS
  const initialWallets = wallets
    // filter unsupported wallet
    .filter(({ net }) => state.getState('supportedNetworkKeys').includes(net))
    // format addresses for correct compare
    .map((initialWallet) => ({
      ...initialWallet,
      address: networks
        .getNetworkClass(initialWallet.net)
        .formatAddress(initialWallet.address),
    }))
    // format publicKeys (convert old (Buffer) public key formats to string)
    .map((initialWallet) => ({
      ...initialWallet,
      publicKey: convertPublicKey(initialWallet.net, initialWallet.publicKey),
    }))

  // UPDATE STORAGE WALLETS
  // get existing storage wallets
  let storageWalletList = storage.wallets.getWalletList()
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
      storage.wallets.updateWallet({
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
        },
      })
    }

    // if storageWallet not found in initialWallets
    if (!existingInitialWallet) {
      // update storageWallet as public
      storage.wallets.updateWallet({
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

// convert publicKey function for backward compatibility
const convertPublicKey = (net, publicKey) => {
  if (publicKey instanceof Buffer) {
    return networks.getNetworkClass(net).convertPublicKeyFromBuffer(publicKey)
  }
  if (getType(publicKey) === 'Object') {
    return networks
      .getNetworkClass(net)
      .convertPublicKeyFromBuffer(Buffer.from(publicKey))
  }
  return publicKey
}
