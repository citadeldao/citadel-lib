import LibraryError from './LibraryError'

export default class TrezorError extends LibraryError {
  constructor(options = {}) {
    super({ message: options.message })
    this.name = 'TrezorError'
  }
}
