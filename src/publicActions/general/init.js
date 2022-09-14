import { checkTypes } from '../../helpers/checkArguments'
import state from '../../state'
import errors from '../../errors'
import { initializeLibrary } from '../../generalFunctions/initializeLibrary'
import { debugConsole } from '../../helpers/debugConsole'
/**
 * Loads a user's balance history
 *
 * @param options OBJECT (REQUIRED) - init options object
 * @param options.backendUrl STRING (REQUIRED) - REST-api URL, etc 'https://app.citadel.one/api'
 * @param options.publicBackendUrl STRING (OPTIONAL) - public REST-api URL for extension, etc 'https://app.citadel.one/api'
 * @param options.socketURL STRING (OPTIONAL) - REST-api URL, etc 'https://api-websockets-user.apps.citadel.okd.3ahtim54r.ru/users'
 * @param options.debug BOOLEAN (OPTIONAL) - 'false' by default. if 'true', the arguments and return values of the called functions are printed to the console.
 * @param options.debugEvents STRING (OPTIONAL) - show event logs if 'true' and debug flag is 'true'
 * @param options.isExtension BOOLEAN (OPTIONAL) - 'false' by default. if 'true', wallets are read from localStorage, and extension methods work without authorization
 * @param options.stringifyLogs BOOLEAN (OPTIONAL) - 'false' by default. If true, all consoles in debug mode are output in JSON format
 * @param options.stringifyResponse BOOLEAN (OPTIONAL) - 'false' by default. If true, all library methods return a string in JSON format
 * @param options.accessToken STRING (OPTIONAL) - used for authorization through a token (сookies are used by default)
 * @param options.refreshToken STRING (OPTIONAL) - used for authorization through a token (сookies are used by default)
 * @param options.appURL STRING (OPTIONAL) - URL for request to apps
 * @returns Returns OBJECT with user info (id, email and subscribe_rewards flag)
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.init({
 *   backendUrl: '//app.citadel.one/api'
 * })
 *
 * // =>
 * {
 *   "result": "success",
 *   "data": {
 *     "user": {
 *       "id": "19194",
 *       "login": "ctitadel-lib@test.ru",
 *       "subscribe_rewards": true
 *     }
 *   },
 *   "error": null
 * }
 */

export const init = async (options = {}) => {
  debugConsole.log('Start initialization...')

  // checks
  checkTypes(['options', options, ['Object'], true])
  const {
    backendUrl,
    publicBackendUrl,
    socketURL,
    appURL,
    debug = false,
    debugEvents = false,
    isExtension,
    stringifyLogs = false,
    stringifyResponse = false,
    getPrivateWalletInfoCallback = () => {},
    accessToken,
    refreshToken,
  } = options
  checkTypes(
    ['backendUrl', backendUrl, ['String'], true],
    ['publicBackendUrl', publicBackendUrl, ['String']],
    ['socketURL', socketURL, ['String']],
    ['debug', debug, ['Boolean']],
    ['debugEvents', debugEvents, ['Boolean']],
    ['isExtension', isExtension, ['Boolean']],
    ['stringifyLogs', stringifyLogs, ['Boolean']],
    ['stringifyResponse', stringifyResponse, ['Boolean']],
    [
      'getPrivateWalletInfoCallback',
      getPrivateWalletInfoCallback,
      ['Function', 'AsyncFunction'],
    ],
    ['accessToken', accessToken, ['String']],
    ['refreshToken', refreshToken, ['String']]
  )
  // reinitialization check
  state.getState('isInitialized') &&
    errors.throwError('LibraryError', {
      message: 'The library has already been initialized',
    })

  // init lib (function already contains updateWalletList event inside)
  await initializeLibrary({
    backendUrl,
    publicBackendUrl,
    socketURL,
    appURL,
    debug,
    debugEvents,
    isExtension,
    stringifyLogs,
    stringifyResponse,
    getPrivateWalletInfoCallback,
    accessToken,
    refreshToken,
  })

  debugConsole.log('Initialization completed')

  // return user info (id, email)
  return { user: state.getState('user') }
}
