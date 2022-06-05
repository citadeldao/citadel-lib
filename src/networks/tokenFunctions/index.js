import networks from '..'
import formatConfig from './formatConfig'
import actionsStore from './actionsStore'
import infosStore from './infosStore'

const stores = {
  infos: infosStore,
  actions: actionsStore,
}

export default {
  getTokenFunctions(net, token, functionGroup) {
    const tokenConfig = networks.getNetworkClass(net).tokens
    const tokenFormat = tokenConfig[token].standard
    const tokenLevelFunctions = tokenConfig[token][functionGroup] || {}
    const formatLevelFunctions =
      formatConfig[tokenFormat]?.[functionGroup] || {}
    // token level in priority
    const functionTypes = { ...formatLevelFunctions, ...tokenLevelFunctions }
    const tokenFunctions = {}
    Object.entries(functionTypes).map(([functionName, type]) => {
      tokenFunctions[functionName] = stores[functionGroup].getItem(
        functionName,
        type
      )
    })
    return tokenFunctions
  },
}
