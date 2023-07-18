//import networkClasses from '../'
import { formatConfig } from './formatConfig'
import { actionsStore } from './actionsStore'
import { infosStore } from './infosStore'
import { additionalConfig } from './../../api/formattedRequestsAdapter/_hardCode'

const stores = {
  infos: infosStore,
  actions: actionsStore,
}

// functionGroup - 'action' or 'info'
export const getTokenFunctions = (net, token, functionGroup, standard) => {
  //const tokenConfig = networkClasses.getNetworkClass(net).tokens
  const tokenFormat = standard/* tokenConfig[token].standard */

  // get token livel functions from formatted config
  // const tokenLevelFunctions = tokenConfig[token][functionGroup] || {}
  const tokenLevelFunctions = additionalConfig.find(item => net === item.net)?.config?.tokens?.[token]?.[functionGroup] || {}

  // get format level functions from format config
  const formatLevelFunctions = formatConfig[tokenFormat]?.[functionGroup] || {}

  // merge token and format level functions, token level in priority
  const functionTypes = { ...formatLevelFunctions, ...tokenLevelFunctions }

  // creat object { actionName: actionFunction } / { infoName: infoFunction }
  const tokenFunctions = {}
  Object.entries(functionTypes).map(([functionName, type]) => {
    tokenFunctions[functionName] = stores[functionGroup].getItem(
      functionName,
      type
    )
  })

  return tokenFunctions
}
