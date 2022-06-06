import errors from '../../errors'

export const responseErrorHandler = (error) => {
  const data = error.response?.data
  const status = error?.response?.status

  if (error?.message === 'Network Error') {
    errors.throwError('NetworkError', { details: error })
  } else if (status >= 500 && status <= 599) {
    errors.throwError('ServerError', {
      message: data?.error?.textError || data?.error,
      url: error.config.url,
      method: error.config.method,
      status,
    })
  } else if (status >= 400 && status <= 499) {
    errors.throwError('RequestError', {
      message: data?.error,
      url: error.config.url,
      method: error.config.method,
      status,
    })
  } else if (error.request) {
    errors.throwError('ServerError', {
      message: 'The server is not responding',
      url: error.config.url,
      method: error.config.method,
      status,
    })
  }
}
