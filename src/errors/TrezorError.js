import { LibraryError } from './LibraryError'

export class TrezorError extends LibraryError {
  constructor(options = {}) {
    super({ message: options.message })
    this.name = 'TrezorError'
  }
}
