import { LibraryError } from './LibraryError'

export class StorageError extends LibraryError {
  constructor(options = {}) {
    super({ message: options.message })
    this.name = 'StorageError'
  }
}
