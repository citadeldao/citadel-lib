import { checkTypes } from '../../helpers/checkArguments'
import state from '../../state'
import errors from '../../errors'
import libCore from '../../libCore'
import { debugConsoleLog } from '../../helpers/debugConsoleLog'

export default async (options = {}) => {
  debugConsoleLog('Start initialization...')

  checkTypes(['options', options, ['Object'], true])
  const {
    backendUrl,
    debug = false,
    stringifyLogs = false,
    stringifyResponse = false,
  } = options
  checkTypes(
    ['backendUrl', backendUrl, ['String'], true],
    ['debug', debug, ['Boolean']],
    ['stringifyLogs', stringifyLogs, ['Boolean']],
    ['stringifyResponse', stringifyResponse, ['Boolean']]
  )

  state.getState('isInitialized') &&
    errors.throwError('LibraryError', {
      message: 'The library has already been initialized',
    })

  await libCore.initializeLibrary({
    backendUrl,
    debug,
    stringifyLogs,
    stringifyResponse,
  })
  debugConsoleLog('Initialization completed')

  return { user: state.getState('user') }
}
