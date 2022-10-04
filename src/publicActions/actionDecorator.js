import { STATUSES } from '../constants'
import errors from '../errors'
import state from '../state'
import { getType } from '../helpers/checkArguments'
import { cloneDeep } from 'lodash'
import { debugConsole } from '../helpers/debugConsole'

// action decorator format public actions returns and catch all errors
export const actionDecorator = (action, actionName) => {
  const ts = Date.now()
  // return wrapped public action (it will be called by the user via citadel[actionName](...args))
  return function (...args) {
    if (state.getState('stringifyResponse')) {
      debugConsole.log(
        `Lib function called: `,
        `"${actionName}". Ts: ${ts}. Arguments:`,
        args
      )
    } else {
      debugConsole.log(
        `%cLib function called: `,
        'color: lightblue;',
        `"${actionName}". Arguments:`,
        args
      )
    }

    try {
      // execute a public function with passed arguments and get result
      const result = action(...args)
      // get type of result
      const typeOfResult = getType(result)
      // for Promise
      if (typeOfResult === 'Promise') {
        // add handlers to promise (to resolve the promise to a formatted object)
        return result.then(
          // on success return formatted success result
          (result) => successResponseFormatter(result, actionName),
          // on error return formatted error result
          (error) => errorResponseFormatter(error, actionName)
        )
      }
      // else (result is not Promise)
      return successResponseFormatter(result, actionName, ts, args)
    } catch (error) {
      // if the public фсешщт threw an exception - wrap error
      return errorResponseFormatter(error, actionName, ts, args)
    }
  }
}

const successResponseFormatter = (result, actionName, ts, args) => {
  // clone the result, preventing the state of the library from changing outside
  const clonedResult = cloneDeep(result)
  // create result object
  let wrappedResult = {
    // success status
    result: STATUSES.SUCCESS,
    // if the action didn't return anything, return null
    data: getType(result) === 'Undefined' ? null : clonedResult,
    error: null,
  }

  // stringify result if the stringifyResponse flag is enabled
  if (state.getState('stringifyResponse')) {
    debugConsole.log(
      `Lib function `,
      `"${actionName}" returned:`,
      cloneDeep(wrappedResult),
      `Call Ts: ${ts}. Arguments:`,
      args
    )

    return JSON.stringify(wrappedResult)
  }

  debugConsole.log(
    `%cLib function `,
    'color: lightblue;',
    `"${actionName}" returned:`,
    cloneDeep(wrappedResult)
  )

  // return wrapped result
  return wrappedResult
}

const errorResponseFormatter = (error, actionName, ts, args) => {
  // console error
  debugConsole.error(error)

  // for unhandled error (not one of the library error instances) modify name)
  if (!(error instanceof errors.getErrorClass('LibraryError'))) {
    error.name = `Unhandled Error. ${error.name}`
  }

  // return wrapped result
  let wrappedResult = {
    result: STATUSES.ERROR,
    data: null,
    error,
  }

  // stringify result if the stringifyResponse flag is enabled
  if (state.getState('stringifyResponse')) {
    // copy the properties of the prototype in the error object to display them correctly in JSON
    wrappedResult.error = {
      // significant error properties
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      details: error.details,
    }

    debugConsole.log(
      `Lib function `,
      `"${actionName}" returned:`,
      cloneDeep(wrappedResult),
      `Call Ts: ${ts}. Arguments:`,
      args
    )

    // wrappedResult
    return JSON.stringify(wrappedResult)
  }

  debugConsole.log(
    `%cLib function `,
    'color: lightblue;',
    `"${actionName}" returned:`,
    cloneDeep(wrappedResult)
  )

  // return wrapped result
  return wrappedResult
}
