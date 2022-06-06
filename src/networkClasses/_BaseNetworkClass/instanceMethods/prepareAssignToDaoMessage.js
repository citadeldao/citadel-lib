// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import api from '../../../api'

export const prepareAssignToDaoMessage = async function () {
  const { data } = await api.requests.prepareAssignToDaoMessage({
    net: this.net,
    address: this.address,
    publicKey: this.publicKey,
  })

  return data
}
