import { requests } from '../requests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'


// modify the backend response (will move to the backend in the future)
export const getNetworksConfig = async () => {
  const backendUrl = state.getState('backendUrl')
  // create original axios function
  const originalRequest = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getNetworksConfig,
    enableResponseHandler: true,
  })

  // get original response
  const networksConfig = await originalRequest()

  //for snip20
  const getSubtokensConfigForSecret = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getSubtokensConfigByNet,
    enableResponseHandler: true,
  })

  //format snip-20 config
  const { tokens } = await getSubtokensConfigForSecret({net: 'secret'})
  const formatedTokensConfig = {}
  tokens.forEach(item => {
    if(item.standard === 'snip20'){
      formatedTokensConfig[item.net] = {...item, hasTransactionComment: false}
    }
  })

  //format main config
  const formatedConfig = {}
  networksConfig.forEach(item => {
    formatedConfig[item.net] = {
      ...item, 
      code: item.primaryToken.code, 
      decimals: item.primaryToken.decimals,
      methods: {...item.methods,...item.frontConfiguration.data, bridge: item.bridge},
      netPrefix: item.connectorProps.netPrefix,
      validating: item.validatingRegExp,
      unstakeingPerioud: item.unbondingPeriod,
      ...item.frontConfiguration,
      ...(item.net === 'secret' && {tokens: formatedTokensConfig})
    }
    delete formatedConfig[item.net].validatingRegExp
    delete formatedConfig[item.net].bridge
    delete formatedConfig[item.net].connectorProps
    delete formatedConfig[item.net].frontConfiguration
    delete formatedConfig[item.net].data
    // delete formatedConfig[item.net].primaryToken
    delete formatedConfig[item.net].unbondingPeriod
  });

  
  return formatedConfig
}
