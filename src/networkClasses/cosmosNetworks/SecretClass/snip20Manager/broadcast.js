import { getSecretClient } from './functions/getSecretClient'
import { cloneDeep } from 'lodash'
import { MsgExecuteContract } from 'secretjs'

export const broadcast = async ({
  address,
  /** messages model:
    [{
      sender,
      contractAddress,
      codeHash, // optional but way faster
      msg,
      sentFunds, // optional
    }]
  */
  messages,
  gasLimit,
  privateKey,
  derivationPath,
  type,
  publicKey,
  simulate = false,
}) => {

  // prepare secret client
  const secretjs = await getSecretClient({
    address,
    privateKey,
    derivationPath,
    type,
    publicKey,
  })

  // format messages
  const clonedMessages = cloneDeep(messages)
  for (const messageIndex in clonedMessages) {
    // add contract codeHash to messages
    const message = clonedMessages[messageIndex]
    if (!message.codeHash && message.contractAddress) {
      message.codeHash = await secretjs.query.compute.contractCodeHash(
        message.contractAddress
      )
    }
    // format message
    clonedMessages[messageIndex] = new MsgExecuteContract(
      clonedMessages[messageIndex]
    )
  }

  // simulate to estimate gas
  if (simulate) {
    return await secretjs.tx.simulate(clonedMessages)
  }

  // execute contract
  return await secretjs.tx.broadcast(clonedMessages, gasLimit)
}
