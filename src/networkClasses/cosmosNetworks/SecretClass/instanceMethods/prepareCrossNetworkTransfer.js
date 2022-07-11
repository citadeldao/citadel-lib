import networkClasses from '../../../'
import { BaseCosmosNetwork } from '../../_BaseCosmosClass'

export async function prepareCrossNetworkTransfer(
  token,
  { toNetwork, toAddress, amount, fee, memo }
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  // For SNIP-20
  if (token !== this.net && networkClass.tokens[token].standard === 'snip20') {
    // return instructions for signing and sending a transaction on the client
    return {
      executeOnClient: {
        instanceMethod: 'useSnip20Manager',
        methodArguments: {
          method: 'doCrossNetworkTransfer',
          address: this.address,
          type: this.type,
          publicKey: this.publicKey,
          bridgeContract: this.bridges[toNetwork],
          contractAddress: networkClass.tokens[token].address,
          decimals: networkClass.tokens[token].decimals,
          toAddress,
          amount,
          fee,
        },
      },
    }
  }

  // For ICS-20
  // instead "super"
  return await BaseCosmosNetwork.prototype.prepareCrossNetworkTransfer.call(
    this,
    token,
    {
      toNetwork,
      toAddress,
      amount,
      fee,
      memo,
    }
  )
}
