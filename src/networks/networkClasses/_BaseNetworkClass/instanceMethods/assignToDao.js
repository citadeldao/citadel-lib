import api from '../../../../api'
import state from '../../../../state'
import errors from '../../../../errors'

export default async function (holderAddress, { privateKey, derivationPath }) {
  if (!state.getState('daoSupportedNetworks').includes(this.net)) {
    errors.throwError('MethodNotSupported', {
      method: 'assignToDao',
      net: this.net,
    })
  }
  const {
    data: { id: messageId, message },
  } = await api.requests.prepareAssignToDaoMessage({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
  })

  const messageSignature = await this.createMessageSignature(message, {
    privateKey,
    derivationPath,
  })

  await api.requests.sendAssignToDaoMessage({
    holderAddress,
    messageId,
    messageSignature,
  })
}
