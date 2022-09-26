import { debugConsole } from '../helpers/debugConsole'

export const retryRequestOnError = async (
  requestFunction,
  {
    retryDelay = 3000,
    retryCount = 1,
    retryableErrorStatusFrom = 500,
    retryableErrorStatusTo = 599,
    throwError = true,
  }
) => {
  let data = null
  let error = null

  // retry if error
  let tryNumber
  for (tryNumber = 0; tryNumber <= retryCount; tryNumber++) {
    try {
      // pause for befor not first try
      tryNumber !== 0 &&
        // await delay
        (await new Promise((resolve) => setTimeout(resolve, retryDelay)))
      // try request
      const response = await requestFunction()
      data = response.data
      // if success reset previous error and break
      error = null
      // exit the loop if ok
      break
    } catch (catchedError) {
      // exit the loop if not retryable error
      // save the error to rethrow it if the attempts are over
      error = catchedError
      if (
        catchedError.status < retryableErrorStatusFrom ||
        catchedError.status > retryableErrorStatusTo
      ) {
        break
      }
    }
  }

  if (error && throwError) {
    throw error
  }
  error && debugConsole.error(error)

  return { data, error: null }
}
