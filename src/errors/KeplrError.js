import { LibraryError } from './LibraryError'

export class KeplrError extends LibraryError {
  constructor(options = {}) {
    super({ message: keplrErrorDictionary[options.message] || options.message })
    this.name = 'KeplrError'
  }
}

const keplrErrorDictionary = {
  'Signer mismatched': 'Please change account in Keplr',
}
