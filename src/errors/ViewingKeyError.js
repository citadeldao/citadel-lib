import { LibraryError } from './LibraryError'

export class ViewingKeyError extends LibraryError {
  constructor(options = {}) {
    const defaultMessage = `No valid keys saved. Simple viewing key is not valid`
    super({ message: options.message || defaultMessage })
    this.name = 'ViewingKeyError'
  }
}
