import { LibraryError } from './LibraryError'

export class WrongArguments extends LibraryError {
  constructor(options) {
    super({ message: options.message })
    this.name = 'WrongArguments'
  }
}
