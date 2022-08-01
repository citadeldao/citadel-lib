import networkClasses from '../../../'
import errors from '../../../../errors'
import { BaseCosmosNetwork } from '../../_BaseCosmosClass'

export async function prepareCrossNetworkTransfer(
  token,
  { toNetwork, toAddress, amount, fee, memo }
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

  // For SNIP-20
  if (token !== this.net && networkClass.tokens[token].standard === 'snip20') {
    const contractAddress = networkClass.tokens[token].address
    // check min amount for secret_eth
    contractAddress === 'secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw' &&
      amount < 0.1 &&
      errors.throwError('RequestError', {
        message: 'Minimum amount is 0.1 sETH',
      })
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
          contractAddress,
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
