import LibraryError from './LibraryError'

export default class LedgerError extends LibraryError {
  constructor(options = {}) {
    super({ message: options.message })
    this.name = 'LedgerError'
    this.code = options.code
  }
}
