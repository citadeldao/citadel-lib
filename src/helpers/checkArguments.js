import errors from '../errors'
import networkClasses from '../networkClasses'
import state from '../state'
import walletInstances from '../walletInstances'
import { DELEGATION_TYPES, CACHE_NAMES } from '../constants'

// get value type as string ('Array', 'Function' etc)
export const getType = (value) =>
  Object.prototype.toString.call(value).replace(/^\[object |\]$/g, '')

// check expected value type by collection of arrays with value, value name and expected type
export const checkTypes = (...args) => {
  args.map(([argumentName, argumentValue, expectedTypes, isRequired]) => {
    const argumentType = getType(argumentValue)
    // if value is not required and not defined, return
    if (
      !isRequired &&
      argumentType === 'Undefined'
      //|| argumentType === 'Null'
    ) {
      return
    }
    // if value has an unexpected type throw error
    if (!expectedTypes.includes(argumentType)) {
      const errorMessage = `Invalid type of argument '${argumentName}'. Expected '${expectedTypes.join(
        ', '
      )}', got '${argumentType}'`
      errors.throwError('WrongArguments', { message: errorMessage })
    }
  })
}

// network key support check
export const checkNetwork = (net) => {
  const supportedNetworks = state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS)
  if (!supportedNetworks.includes(net)) {
    const errorMessage = `'${net}' network key is not supported. Supported network keys: ${supportedNetworks.join(
      ', '
    )}`
    errors.throwError('WrongArguments', { message: errorMessage })
  }
}

// network or token key support check
export const checkNetworkOrToken = (netOrToken, trowError = true) => {
  const supportedKeys = [
    ...state.getState(CACHE_NAMES.SUPPORTED_NETWORK_KEYS),
    ...Object.keys(state.getState('supportedTokens')),
  ]
  if (!supportedKeys.includes(netOrToken)) {
    const errorMessage = `'${netOrToken}' network/token key is not supported.`
    trowError && errors.throwError('WrongArguments', { message: errorMessage })
  }
  return supportedKeys.includes(netOrToken)
}

// checking the existence of a wallet with this id
export const checkWalletId = (walletId) => {
  if (!walletInstances.getWalletInstanceById(walletId)) {
    errors.throwError('WalletListError', {
      message: `Wallet with id "${walletId}" not found among the initialized wallets`,
    })
  }
}

// check library initialization
export const checkInitialization = () => {
  !state.getState('isInitialized') &&
    errors.throwError('LibraryError', {
      message: 'Library is not initialized. Run init() method before using',
    })
}

// network check for dao support
export const checkNetworkDaoSupport = (net) => {
  if (!state.getState('daoSupportedNetworks').includes(net)) {
    errors.throwError('MethodNotSupported', {
      method: 'assignToDao',
      net,
    })
  }
}

// checking if the network has a token
export const checkNetworkToken = (net, token) => {
  if (
    !Object.keys(networkClasses.getNetworkClass(net).tokens).includes(token)
  ) {
    errors.throwError('Wrong arguments', {
      message: `Network "${net}" does not support the token with the key "${token}"`,
    })
  }
}

// check token support by network
export const checkTokensSupport = (net) => {
  if (
    !networkClasses.getNetworkClass(net).tokens ||
    !Object.keys(networkClasses.getNetworkClass(net).tokens).length
  ) {
    errors.throwError('MethodNotSupported', {
      message: `Network "${net}" does not support tokens`,
    })
  }
}

export const checkDelegationTypes = (type) => {
  !Object.values(DELEGATION_TYPES).includes(type) &&
    errors.throwError('WrongArguments', {
      message: `Invalid type of delegation. Expected '${Object.values(
        DELEGATION_TYPES
      ).join(', ')}', got '${type}'`,
    })
}
