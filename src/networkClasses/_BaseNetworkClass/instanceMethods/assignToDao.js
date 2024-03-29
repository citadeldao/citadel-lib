import api from '../../../api'

export const assignToDao = async function (
  holderAddress,
  { privateKey, derivationPath, transportType = 'usb' }
) {
  // prepares message
  const {
    data: { id: messageId, message },
  } = await api.requests.prepareAssignToDaoMessage({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
  })

  // sign message
  const messageSignature = await this.createMessageSignature(message, {
    privateKey,
    derivationPath,
    transportType
  })

  // send mesage
  await api.requests.sendAssignToDaoMessage({
    holderAddress,
    messageId,
    messageSignature,
  })
}
