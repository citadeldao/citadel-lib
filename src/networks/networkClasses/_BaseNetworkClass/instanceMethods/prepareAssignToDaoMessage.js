// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import api from '../../../../api'
import state from '../../../../state'
import errors from '../../../../errors'

export default async function () {
  if (!state.getState('daoSupportedNetworks').includes(this.net)) {
    errors.throwError('MethodNotSupported', {
      method: 'prepareAssignToDaoMessage',
      net: this.net,
    })
  }
  const { data } = await api.requests.prepareAssignToDaoMessage({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
  })

  return data
}
