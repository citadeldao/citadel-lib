import errors from '../../../../../errors'
import networks from '../../../..'

// DISABLED (needs fix and refact)
export async function prepareCrossNetworkTransfer(
  token,
  { toNetwork, toAddress, amount, fee }
) {
  const networkClass = networks.getNetworkClass(this.net)
  return {
    executeOnClient: {
      instanceMethod: '_useSnip20Manager',
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
