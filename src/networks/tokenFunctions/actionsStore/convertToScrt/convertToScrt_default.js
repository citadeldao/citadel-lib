import { checkTypes } from '../../../../helpers/checkArguments'
import networks from '../../..'

export default async function ({
  token,
  privateKey,
  derivationPath,
  amount,
  fee,
}) {
  const networkClass = networks.getNetworkClass(this.net)

  checkTypes(
    ['amount', amount, ['Number', 'String'], true],
    ['fee', fee, ['Number', 'String']]
  )

  return {
    executeOnClient: {
      instanceMethod: '_useSnip20Manager',
      methodArguments: {
        method: 'convertScrtToSecretScrt',
        address: this.address,
        contractAddress: networkClass.tokens[token].address,
        type: this.type,
        publicKey: this.publicKey,
        decimals: networkClass.tokens[token].decimals,
        privateKey,
        derivationPath,
        amount,
        fee,
      },
    },
  }
}
