import networkClasses from '../../../'

// DISABLED (needs fix and refact)
export async function prepareCrossNetworkTransfer(
  token,
  { toNetwork, toAddress, amount, fee }
) {
  const networkClass = networkClasses.getNetworkClass(this.net)

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
