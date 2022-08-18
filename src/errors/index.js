import { MethodNotSupported } from './MethodNotSupported'
import { MethodNotImplemented } from './MethodNotImplemented'
import { ServerError } from './ServerError'
import { RequestError } from './RequestError'
import { NetworkError } from './NetworkError'
import { WrongArguments } from './WrongArguments'
import { LibraryError } from './LibraryError'
import { WalletListError } from './WalletListError'
import { TrezorError } from './TrezorError'
import { LedgerError } from './LedgerError'
import { ViewingKeyError } from './ViewingKeyError'
import { StorageError } from './StorageError'

/********************** ERROR MODULE***********************
 * Exports by default an object with a method to throw the error of the specific class
 *
 * HOW TO USE:
 * // throw some 'Method not supported' error
 * errors.throwError('MethodNotSupported', { message: ' method X not supported for Y'})
 **********************************************************/

const errors = {
  MethodNotSupported,
  MethodNotImplemented,
  ServerError,
  RequestError,
  NetworkError,
  WrongArguments,
  LibraryError,
  WalletListError,
  TrezorError,
  LedgerError,
  ViewingKeyError,
  StorageError
}

const getErrorClass = (errorName) => errors[errorName]

// erroName - error class name, options contain 'message' key
const throwError = (errorName, options) => {
  throw new errors[errorName](options)
}

export default {
  getErrorClass,
  throwError,
}
