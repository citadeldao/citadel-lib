import { LibraryError } from './LibraryError'

export class RequestError extends LibraryError {
  constructor(options) {
    super({ message: options.message })
    this.name = 'RequestError'
    this.status = options.status
    this.url = options.url
    this.method = options.method
    this.code = options.code
  }
}
