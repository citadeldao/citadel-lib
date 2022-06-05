import api from '../../api'
import { additionalConfig } from './_hardCode'
import { merge } from '../../helpers/merge'

export default async () => {
  const networksConfig = await api.requests.getNetworksConfig()

  // add hardcode configs
  additionalConfig.map(({ net, config }) => {
    merge(networksConfig[net], config)
  })

  // add hasTransactionComment true for all tokens except snip20
  Object.entries(networksConfig).map(([net, { tokens }]) => {
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

  return networksConfig
}
