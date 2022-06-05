import LibraryError from './LibraryError'

export default class NetworkError extends LibraryError {
  constructor(options = {}) {
    const defaultMessage = 'Please check your internet connection and try again'
    super({ message: options.message || defaultMessage })
    this.name = 'NetworkError'
    this.details = options.details
  }
}
