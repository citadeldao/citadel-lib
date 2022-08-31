import { LibraryError } from './LibraryError'

export class KeplrError extends LibraryError {
  constructor(options = {}) {
    super({
      message: keplrErrorConfig[options.message]?.message || options.message,
    })
    this.name = 'KeplrError'
    this.code = keplrErrorConfig[options.message]?.code || options.code || 0
  }
}

const keplrErrorConfig = {
  'Signer mismatched': {
    message: 'Please change account in Keplr',
    code: 1,
  },
}
