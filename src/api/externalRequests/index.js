import { getKTAccounts } from './getKTAccounts'
import { getIostAccounts } from './getIostAccounts'

/**
 * EXTERNAL REQUESTS:
 * 
 * Functions that return an object with request parameters for axios-instance.
 * 'External' - means that the axios instance does not have a BASE URL with the citadel backend domain.
 * The URL is completely contained in a function with parameters.
 */

export const externalRequests = {
  getKTAccounts,
  getIostAccounts,
}
