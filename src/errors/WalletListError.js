import LibraryError from './LibraryError'

export default class WalletListError extends LibraryError {
  constructor(options) {
    super({ message: options.message })
    this.name = 'WalletListError'
  }
}
