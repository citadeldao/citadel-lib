import { checkTypes } from '../../../../helpers/checkArguments'
import networkClasses from '../../../'

export async function convertToScrt_default({
  token,
  privateKey,
  derivationPath,
  amount,
  fee,
}) {
  // to get tokens consfig
  const networkClass = networkClasses.getNetworkClass(this.net)

  // check arguments
  checkTypes(
    ['amount', amount, ['Number', 'String'], true],
    ['fee', fee, ['Number', 'String']]
  )

  // preparation of instructions for signing on the client (so as not to break the flow citadel.prepare -> citadel.signAndSend
  return {
    executeOnClient: {
      // wallet onstance method
      instanceMethod: '_useSnip20Manager',
      // arguments
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
