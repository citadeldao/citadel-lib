// import { additionalConfig } from './_hardCode'
// import { merge } from '../../helpers/merge'
import { requests } from '../requests'
import { createApiRequests } from '../createApiRequests'
import state from '../../state'
// import storage from '../../storage'
// import { CACHE_NAMES } from '../../constants'

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

  //for snip20
  const getSubtokensConfigForSecret = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getSubtokensConfigByNet,
    enableResponseHandler: true,
  })

  //TODO GRISH
  //newConfig
  const newRequest = createApiRequests({
    baseURL: backendUrl,
    withCredentials: true,
    singleRequest: requests.getNewNetworksConfig,
    enableResponseHandler: true,
  })

  // get original response
  const networksConfig = await originalRequest()

  //TODO GRISH
  // get new response
  const newNetworksConfig = await newRequest()
  const { tokens } = await getSubtokensConfigForSecret({net: 'secret'})
  const formatedTokensConfig = {}
  tokens.forEach(item => {
    if(item.standard === 'snip20'){
      formatedTokensConfig[item.net] = {...item, hasTransactionComment: false}
    }
  })
  const formatedConfig = {}
  newNetworksConfig.forEach(item => {
    formatedConfig[item.net] = {
      ...item, 
      code: item.primaryToken.code, 
      decimals: item.primaryToken.decimals,
      methods: {...item.frontConfiguration.data, bridge: item.bridge},
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
    delete formatedConfig[item.net].primaryToken
    delete formatedConfig[item.net].unbondingPeriod
  });

  // add hardcode configs
  // additionalConfig.map(({ net, config }) => {
  //   merge(networksConfig[net], config)
  // })

  // add hasTransactionComment true for all tokens except snip20
  Object.entries(networksConfig).map(([net, { tokens }]) => {
    //networksConfig[net].unstakeingPerioud = storage.caches.getCache(CACHE_NAMES.MARKETCAPS)[net]?.unbondingPeriod || 0
    if (tokens && Object.keys(tokens).length) {
      Object.entries(tokens).map(([token, { standard }]) => {
        if (standard === 'snip20') {
          networksConfig[net].tokens[token].hasTransactionComment = false
        } else {
          networksConfig[net].tokens[token].hasTransactionComment = true
        }
      })
    }
  })

  // TODO GRISH
  Object.entries(networksConfig).map(([net, { tokens, /* derivationPathTemplates, unstakeingPerioud */}]) => {
    // formatedConfig[net].unstakeingPerioud = unstakeingPerioud
    formatedConfig[net].tokens = tokens
    // formatedConfig[net].derivationPathTemplates = derivationPathTemplates
  })

  console.log('test111', networksConfig, formatedConfig);

  return formatedConfig //networksConfig
}
