import { LibraryError } from './LibraryError'

export class MethodNotSupported extends LibraryError {
  constructor(options) {
    const defaultMessage = `The '${options.method}' method is not supported by the '${options.net}' network`
    super({ message: options.message || defaultMessage })
    this.name = 'MethodNotSupported'
  }
}