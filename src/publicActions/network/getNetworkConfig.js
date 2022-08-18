import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Returns network config object from cache (networks.json request). 
 *
 * @param net STRING (REQUIRED) - network key
 * 
 * @returns Returns OBJECT with net config
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = citadel.getNetworkConfig('secret')
 *
 * // =>
  {
    code: 'SCRT',
    decimals: '6',
    fee_key: 'fee',
    methods: {
      stake: 'multiStake',
      claim: true,
      bridge: [
        'secret_scrt',
        'akash_secret',
        'axelar_secret',
        'chihuahua_secret',
        'cosmos_secret',
        'evmos_secret',
        'gbridge_secret',
        'juno_secret',
        'osmosis_secret',
        'sentinel_secret',
        'sifchain_secret',
        'stargaze_secret',
      ],
    },
    name: 'Secret',
    net: 'secret',
    tokens: {
      secret_scrt: {
        net: 'secret_scrt',
        name: 'sSCRT',
        code: 'SCRT',
        nomicsCode: 'SCRT',
        address: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
        addressDst: '0x2B89bF8ba858cd2FCee1faDa378D5cd6936968Be',
        decimals: '6',
        standard: 'snip20',
        favorite: true,
        methods: {
          bridge: ['secret'],
        },
        coingeckoCode: 'secret',
      },
      // ...
    },
    validating: '^secret([a-z0-9]{39})$',
    bridges: {
      eth: 'secret1sferux27lpr3lm52c8sq2dd7m54xhm28thnj5y',
      bsc: 'secret168mwctng6s7vk9w5d7n0wsty2f7vaq3rjq8g7c',
    },
    channels: {
      osmosis: {
        'channel-1': {
          id: '111',
          srcNet: 'secret',
          dstNet: 'osmosis',
          forwardChannel: 'channel-1',
          backwardChannel: 'channel-88',
          srcTokenStandard: 'ics20',
          dstTokenStandard: 'ics20',
          srcPort: 'transfer',
          dstPort: 'transfer',
          createdAt: '2022-08-04T10:30:13.068Z',
          updatedAt: '2022-08-04T10:30:13.068Z',
          source: 'generated',
        },
      },
      //...
    },
  }
 */

export const getNetworkConfig = (net) => {
  // checks
  checkInitialization()
  checkTypes(['net', net, ['String'], true])
  checkNetwork(net)

  // call static network method
  return networkClasses.getNetworkClass(net).getNetworkConfig()
}
