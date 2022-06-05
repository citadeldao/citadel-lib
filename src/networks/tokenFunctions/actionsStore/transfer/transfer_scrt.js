import { checkTypes } from '../../../../helpers/checkArguments'
import networks from '../../..'

export default async function ({ token, toAddress, amount, fee }) {
  checkTypes(
    ['amount', amount, ['String', 'Number'], true],
    ['toAddress', toAddress, ['String'], true],
    ['fee', fee, ['String', 'Number']]
  )
  const networkClass = networks.getNetworkClass(this.net)
  return {
    executeOnClient: {
      instanceMethod: '_useSnip20Manager',
      methodArguments: {
        method: 'doTokenTransfer',
        address: this.address,
        contractAddress: networkClass.tokens[token].address,
        decimals: networkClass.tokens[token].decimals,
        publicKey: this.publicKey,
        type: this.type,
        toAddress,
        amount,
        fee,
      },
    },
  }
}
