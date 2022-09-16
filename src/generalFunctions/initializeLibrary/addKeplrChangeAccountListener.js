import { SECRET_NET_KEY } from '../../constants'
import walletInstances from '../../walletInstances'
import { keplrChains } from '../../networkClasses/cosmosNetworks/_BaseCosmosClass/signers/keplrChains'
import { debugConsole } from '../../helpers/debugConsole'

export const addKeplrChangeAccountListener = async () => {
  try {
    const keplr = window.keplr
    if (!keplr) {
      return
    }
    const chainId = keplrChains[SECRET_NET_KEY]
    window.addEventListener('keplr_keystorechange', async () => {
      // get current keplr address
      const keplrAddress = (await keplr.getKey(chainId))?.bech32Address
      if (!keplrAddress) {
        return
      }
      const currentSecretWalletInstance =
        walletInstances.getWalletInstanceByAddress(SECRET_NET_KEY, keplrAddress)
      // load all snip20 tokens with VK from keplr
      currentSecretWalletInstance &&
        (await currentSecretWalletInstance.loadKeplrSnip20Balances())
    })
  } catch (error) {
    debugConsole.error(error)
  }
}
