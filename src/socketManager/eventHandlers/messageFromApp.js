import api from '../../api'
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
        const savedVK =
          walletInstance?.savedViewingKeys &&
          Object.values(walletInstance.savedViewingKeys).find(
            ({ contractAddress }) => contractAddress === contract
          )?.viewingKey

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
        message: { error },
        type,
      })
    }
  }
}
