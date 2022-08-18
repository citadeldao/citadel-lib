import networkClasses from '../../networkClasses'
import {
  checkTypes,
  checkNetwork,
  checkInitialization,
} from '../../helpers/checkArguments'

/**
 * Returns a list of available validator nodes for the network
 *
 * @param net STRING (REQUIRED) - net key
 * 
 * @returns Returns OBJECT with nodes list
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.getStakeNodes('cosmos')
 *
 * // =>
  {
    result: 'success',
    data: [
      {
        name: 'citadeldao',
        address: 'citadeldao',
        description:
          'Citadel.one started its validator journey in 2018 and today we already run active validator nodes in more than 30 networks including IOST. Not only we are building our Validator Universe, but also Citadel.one platform - a multifunctional non-custodial solution for all things crypto including storage, staking, analysis, and management of crypto assets. We plan to support networks’ core functionality and provide further opportunities for interactions with integrated assets. Apart from integrations, we support IOST ecosystem via our marketing channels - we provide biweekly infographics, educational materials.',
        imageSource: 'https://s2.loli.net/2022/01/19/CeR46SWObDgnzTi.png',
        uptime: 100,
        isActive: true,
        fee: 50,
        tags: [
          {
            name: 'Recommended',
            color: '#9900ef',
          },
        ],
      },
      {
        name: 'slakov',
        address: 'slakov',
        description: 'Passionate crypto evangelist since 2013.',
        imageSource: 'https://i.loli.net/2019/10/17/L29zf4TQkOqycnJ.png',
        uptime: 100,
        isActive: true,
        fee: 50,
        tags: [],
      },
      // ...
    ],
    error: null,
  }
 */

export const getStakeNodes = async (net) => {
  // checks
  checkInitialization()
  checkTypes(['net', net, ['String'], true])
  checkNetwork(net)

  // call static network method
  return await networkClasses.getNetworkClass(net).getStakeNodes()
}
