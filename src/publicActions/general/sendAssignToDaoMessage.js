// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import api from '../../api'

export default async function(holderAddress, messageId, messageSignature) {
  await api.requests.sendAssignToDaoMessage({
    holderAddress,
    messageId,
    messageSignature,
  })
}
