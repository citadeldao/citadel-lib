import api from "../../api"
import {
  WALLET_TYPES,
  SECRET_NET_KEY,
  APP_MESSAGE_TYPES,
} from "../../constants"
import networkClasses from "../../networkClasses"
import walletInstances from "../../walletInstances"
import { keplrChains } from "../../networkClasses/cosmosNetworks/_BaseCosmosClass/signers/keplrChains"

const TYPES = {
  SECRET_QUERY: "scrt-query",
  SECRET_BALANCE: "view-scrt-balance",
}

const VK_TEXT_VARIABLE = "%viewing_key%"
const KEPLR_ACCOUNT_MISMATCH_MESSAGE = "Please change Keplr account"

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
  if (!Object.values(TYPES).includes(type)) {
    return
  }

  if (!tokenContract) {
    tokenContract = contract
  }

  // get snip20 manager
  const snip20Manager = await networkClasses
    .getNetworkClass(SECRET_NET_KEY)
    .getSnip20Manager()

  // get walletInstance
  const walletInstance = walletInstances.getWalletInstanceByAddress(
    SECRET_NET_KEY,
    sender || address
  )
  // TODO: refact!
  if (type === TYPES.SECRET_QUERY) {
    // detect error
    let isError = false
    let warningMessage = false
    try {
      // replace %viewing_key% in msg if it exist
      const msgString = JSON.stringify(msg)
      if (msgString.includes(VK_TEXT_VARIABLE)) {
        // send warning message if VK required and account mismatch
        if (
          walletInstance.type === WALLET_TYPES.KEPLR &&
          (await checkKeplrAccountMismatch(walletInstance.address))
        ) {
          warningMessage = KEPLR_ACCOUNT_MISMATCH_MESSAGE
        }
        // get savedVK
        let savedVK =
          walletInstance?.savedViewingKeys &&
          Object.values(walletInstance.savedViewingKeys).find(
            ({ contractAddress }) => contractAddress === tokenContract
          )?.viewingKey
        // get keplr VK if no sevedVK
        if (!savedVK && walletInstance.type === WALLET_TYPES.KEPLR) {
          try {
            savedVK = await snip20Manager.getViewingKeyByKeplr(
              SECRET_NET_KEY,
              tokenContract,
              sender
            )
          } catch (error) {
            // throw 'change keplr account' (code: 1) error only
            if (error.code === 1) {
              throw error
            }
          }
        }
        if (!savedVK) {
          isError = true
          throw Error("Viewingkey not found, query skipped")
        }
        // replace msg with VK
        msg = JSON.parse(msgString.replace(VK_TEXT_VARIABLE, savedVK))
      }

      // msg contract
      const response = await snip20Manager.queryContract({
        contractAddress: tokenContract,
        query: msg,
      })

      // parse error
      const errorKeywords = ["err", "unauthorized"]
      errorKeywords.map((errorKeyword) => {
        if (JSON.stringify(response).includes(errorKeyword)) {
          isError = true
        }
      })

      // send result to app
      await api.externalRequests.sendCustomMessage({
        token: from,
        message: {
          type: isError ? APP_MESSAGE_TYPES.ERROR : APP_MESSAGE_TYPES.SUCCESS,
          response,
          tokenContract,
          ...(warningMessage && {
            warning: warningMessage,
          }),
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
          tokenContract,
          ...(warningMessage && {
            warning: warningMessage,
          }),
        },
        type,
      })
    }
  } else if (type === TYPES.SECRET_BALANCE) {
    let warningMessage = false

    try {
      // get toke key by contract address
      const tokenKey = Object.values(
        networkClasses.getNetworkClass(SECRET_NET_KEY).tokens
      ).find(
        ({ standard, address }) =>
          standard === "snip20" && address === tokenContract
      )?.net
      // return if no tokenKey (constract address not found in networks.json)
      if (!tokenKey) return
      // send warning message if account mismatch
      if (
        walletInstance.type === WALLET_TYPES.KEPLR &&
        (await checkKeplrAccountMismatch(walletInstance.address))
      ) {
        warningMessage = KEPLR_ACCOUNT_MISMATCH_MESSAGE
      }
      if (!walletInstance) return

      // update balance (by SVK, keplr etc)
      const balance = await walletInstance.callTokenInfo(tokenKey, "balance")
      await api.externalRequests.sendCustomMessage({
        token: from,
        message: {
          balance: balance.calculatedBalance,
          tokenContract,
          ...(warningMessage && {
            warning: warningMessage,
          }),
        },
        type,
      })
    } catch (error) {
      // send error to app
      await api.externalRequests.sendCustomMessage({
        token: from,
        message: {
          balance: "Viewingkey not found, balance: ?",
          tokenContract,
          ...(warningMessage && {
            warning: warningMessage,
          }),
        },
        type,
      })
    }
  }
}

const checkKeplrAccountMismatch = async (walletAddress) => {
  // check account
  const chainId = keplrChains[SECRET_NET_KEY]
  const keplrAddress = (await window.keplr.getKey(chainId))?.bech32Address
  if (walletAddress !== keplrAddress) {
    return true
  }
  return false
}
