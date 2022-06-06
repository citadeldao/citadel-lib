import { checkTypes } from '../../../../helpers/checkArguments'
import networkClasses from '../../../'

export async function transfer_scrt({ token, toAddress, amount, fee }) {
  // check arguments
  checkTypes(
    ['amount', amount, ['String', 'Number'], true],
    ['toAddress', toAddress, ['String'], true],
    ['fee', fee, ['String', 'Number']]
  )

  // to get tokens consfig
  const networkClass = networkClasses.getNetworkClass(this.net)

  // preparation of instructions for signing on the client (so as not to break the flow citadel.prepare -> citadel.signAndSend
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
