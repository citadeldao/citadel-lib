// Relevant until the Kepler signature is integrated into the library. After using the 'Assign To Dao' method
import api from '../../api'

/**
 * !Will be removed soon
 */

export const removeAssignToDaoMessage = async function (
  holderAddress,
  messageId,
  messageSignature
) {
  // TODO: checks

  // get data from api
  await api.requests.removeAssignToDaoMessage({
    holderAddress,
    messageId,
    messageSignature,
  })
}
