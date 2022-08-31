import api from '../../api'
import { WALLET_TYPES } from '../../constants'
import networkClasses from '../../networkClasses'
import walletInstances from '../../walletInstances'

const TYPES = {
  SECRET_QUERY: 'scrt-query',
}

const VK_TEXT_VARIABLE = '%viewing_key%'

const SECRET_NET_KEY = 'secret'

export const messageFromApp = async ({
  from: token,
  type,
  message: {
    contract,
    sender,
    //  gas,
    msg,
  } = {},
}) => {
  if (!Object.values(TYPES).includes(type)) {
    return
  }

  // get snip20 manager
  const snip20Manager = networkClasses
    .getNetworkClass(SECRET_NET_KEY)
    .getSnip20Manager()

  // get walletInstance
  const walletInstance = walletInstances.getWalletInstanceByAddress(
    SECRET_NET_KEY,
    sender
  )

  if (type === TYPES.SECRET_QUERY) {
    try {
      // replace %viewing_key% in msg if it exist
      const msgString = JSON.stringify(msg)
      if (msgString.includes(VK_TEXT_VARIABLE)) {
        // get savedVK
        let savedVK =
          walletInstance?.savedViewingKeys &&
          Object.values(walletInstance.savedViewingKeys).find(
            ({ contractAddress }) => contractAddress === contract
          )?.viewingKey
        // get keplr VK if no sevedVK
        if (!savedVK && walletInstance.type === WALLET_TYPES.KEPLR) {
          try {
            savedVK = await snip20Manager.getViewingKeyByKeplr(
              SECRET_NET_KEY,
              contract
            )
          } catch (error) {
            // throw 'change keplr account' error only
            if (error.code === 1) {
              throw error
            }
          }
        }

        // replace msg with VK
        msg = JSON.parse(msgString.replace(VK_TEXT_VARIABLE, savedVK))
      }

      // msg contract
      const response = await snip20Manager.queryContract({
        contractAddress: contract,
        query: msg,
      })

      // send result to app
      await api.externalRequests.sendCustomMessage({
        token,
        message: response,
        type,
      })
    } catch (error) {
      // send error to app
      await api.externalRequests.sendCustomMessage({
        token,
        message: { error: error.message },
        type,
      })
    }
  }
}
