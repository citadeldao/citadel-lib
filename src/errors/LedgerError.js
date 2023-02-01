import { LibraryError } from './LibraryError'

export class LedgerError extends LibraryError {
  constructor(options = {}) {
    super({ message: options.message })
    this.name = 'LedgerError'
    this.code = options.code
    this.data = options?.data || null
  }
}
