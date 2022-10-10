import api from '../../api'
import {
  WALLET_TYPES,
  SECRET_NET_KEY,
  APP_MESSAGE_TYPES,
} from '../../constants'
import networkClasses from '../../networkClasses'
import walletInstances from '../../walletInstances'

const TYPES = {
  SECRET_QUERY: 'scrt-query',
  SECRET_BALANCE: 'view-scrt-balance',
}

const VK_TEXT_VARIABLE = '%viewing_key%'

export const messageFromApp = async ({
  from,
  type,
  message: {
    contract,
    sender,
    //  gas,
    msg,
    address,
    tokenContract,
  } = {},
} = {}) => {
  console.log('>>> messageFromApp', type)
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
              contract,
              sender
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
      // detect error
      let isError = false
      const errorKeywords = ['err', 'unauthorized']
      Object.keys(response || {}).map((key) =>
        errorKeywords.map((errorKeyword) => {
          if (key.includes(errorKeyword)) {
            isError = true
          }
        })
      )
      // send result to app
      await api.externalRequests.sendCustomMessage({
        token: from,
        message: {
          type: isError ? APP_MESSAGE_TYPES.ERROR : APP_MESSAGE_TYPES.SUCCESS,
          response,
        },
        type,
      })
    } catch (error) {
      // send error to app
      await api.externalRequests.sendCustomMessage({
        token: from,
        message: {
          type: APP_MESSAGE_TYPES.ERROR,
          response: { error: error.message },
        },
        type,
      })
    }
  } else if (type === TYPES.SECRET_BALANCE) {
    const sendErrorMessage = async () => {
      // send error to app
      await api.externalRequests.sendCustomMessage({
        token: from,
        message: {
          balance: 'Viewingkey not found, balance: ?',
          tokenContract,
        },
        type,
      })
    }
    try {
      // get toke key by contract address
      const tokenKey = Object.values(
        networkClasses.getNetworkClass(SECRET_NET_KEY).tokens
      ).find(
        ({ standard, address }) =>
          standard === 'snip20' && address === tokenContract
      )?.net
      // return if no tokenKey (constract address not found in networks.json)
      if (!tokenKey) return
      const walletInstance = walletInstances.getWalletInstanceByAddress(
        SECRET_NET_KEY,
        address
      )

      if (!walletInstance) return

      // update balance (by SVK, keplr etc)
      const { data: balance, error } = await walletInstance.callTokenInfo(
        tokenKey,
        'balance'
      )
      error && (await sendErrorMessage())
      // send result to app
      !error &&
        (await api.externalRequests.sendCustomMessage({
          token: from,
          message: {
            balance: balance.calculatedBalance,
            tokenContract,
          },
          type,
        }))
    } catch {
      await sendErrorMessage()
    }
  }
}
