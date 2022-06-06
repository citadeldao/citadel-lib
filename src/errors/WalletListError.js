import { LibraryError } from './LibraryError'

export class WalletListError extends LibraryError {
  constructor(options) {
    super({ message: options.message })
    this.name = 'WalletListError'
  }
}
