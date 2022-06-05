import { STATUSES } from './constants'
import errors from './errors'
import state from './state'
import { getType } from './helpers/checkArguments'
import { cloneDeep } from 'lodash'
import { debugConsoleLog } from './helpers/debugConsoleLog'

export const actionDecorator = (action, actionName) => {
  return function (...args) {
    debugConsoleLog(`Lib function called: "${actionName}". Arguments:`, args)
    try {
      const result = action(...args)
      const typeOfResult = getType(result)
      if (typeOfResult === 'Promise') {
        return result.then(
          (result) => successResponseDecorator(result, actionName),
          (error) => errorResponseDecorator(error, actionName)
        )
      }
      return successResponseDecorator(result, actionName)
    } catch (error) {
      return errorResponseDecorator(error, actionName)
    }
  }
}

const successResponseDecorator = (result, actionName) => {
  const typeOfResult = getType(result)
  // so that changes outside do not affect the state of the library
  const clonedResult = cloneDeep(result)
  let wrappedResult = {
    result: STATUSES.SUCCESS,
    data: typeOfResult === 'Undefined' ? null : clonedResult,
    error: null,
  }
  if (state.getState('stringifyResponse')) {
    wrappedResult = JSON.stringify(wrappedResult)
  }

  debugConsoleLog(
    `Lib function "${actionName}" returned:`,
    cloneDeep(wrappedResult)
  )
  return wrappedResult
}

const errorResponseDecorator = (error, actionName) => {
  console.error(error)
  if (!(error instanceof errors.getErrorClass('LibraryError'))) {
    error.name = `Unhandled Error. ${error.name}`
  }

  let wrappedResult = {
    result: STATUSES.ERROR,
    data: null,
    error,
  }

  if (state.getState('stringifyResponse')) {
    // copy the properties of the prototype to correctly display the error in JSON
    wrappedResult.error = {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      details: error.details,
    }

    wrappedResult = JSON.stringify(wrappedResult)
  }

  debugConsoleLog(
    `Lib function "${actionName}" returned:`,
    cloneDeep(wrappedResult)
  )

  return wrappedResult
}
