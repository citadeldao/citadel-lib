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
}

const getErrorClass = (errorName) => errors[errorName]

const throwError = (errorName, options) => {
  throw new errors[errorName](options)
}

export default {
  getErrorClass,
  throwError,
}
