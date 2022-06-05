import LibraryError from './LibraryError'

export default class MethodNotImplemented extends LibraryError {
  constructor(options) {
    const defaultMessage = `The '${
      options.method
    }' method is not yet implemented${
      options.net ? ` for ${options.net} network` : ''
    }`
    super({ message: options.message || defaultMessage })
    this.name = 'MethodNotImplemented'
  }
}
