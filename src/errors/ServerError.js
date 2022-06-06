import { LibraryError } from './LibraryError'

export class ServerError extends LibraryError {
  constructor(options) {
    super({ message: options.message })
    this.name = 'ServerError'
    this.status = options.status
    this.url = options.url
    this.method = options.method
  }
}
