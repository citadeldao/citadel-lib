import LibraryError from './LibraryError'

export default class WrongArguments extends LibraryError {
  constructor(options) {
    super({ message: options.message })
    this.name = 'WrongArguments'
  }
}
