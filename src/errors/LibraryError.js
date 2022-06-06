export class LibraryError extends Error {
  constructor({ message }) {
    super(message)
    this.name = 'LibraryError'
  }
}
