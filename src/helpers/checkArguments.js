import errors from '../errors'
import state from '../state'
import walletInstances from '../walletInstances'

export const getType = (value) =>
  Object.prototype.toString.call(value).replace(/^\[object |\]$/g, '')

export const checkTypes = (...args) => {
  args.map(([argumentName, argumentValue, expectedTypes, isRequired]) => {
    const argumentType = getType(argumentValue)
    if (
      !isRequired &&
      argumentType === 'Undefined'
      //|| argumentType === 'Null'
    )
      return
    if (!expectedTypes.includes(argumentType)) {
      const errorMessage = `Invalid type of argument '${argumentName}'. Expected '${expectedTypes.join(
        ', '
      )}', got '${argumentType}'`
      errors.throwError('WrongArguments', { message: errorMessage })
    }
  })
}

export const checkNetwork = (net) => {
  const supportedNetworks = state.getState('supportedNetworkKeys')
  if (!supportedNetworks.includes(net)) {
    const errorMessage = `'${net}' network key is not supported. Supported network keys: ${supportedNetworks.join(
      ', '
    )}`
    errors.throwError('WrongArguments', { message: errorMessage })
  }
}

export const checkNetworkOrToken = (netOrToken, trowError = true) => {
  const supportedKeys = [
    ...state.getState('supportedNetworkKeys'),
    ...Object.keys(state.getState('supportedTokens')),
  ]
  if (!supportedKeys.includes(netOrToken)) {
    const errorMessage = `'${netOrToken}' network/token key is not supported.`
    trowError && errors.throwError('WrongArguments', { message: errorMessage })
  }
  return supportedKeys.includes(netOrToken)
}

export const checkWalletId = (walletId) => {
  if (!walletInstances.getWalletInstanceById(walletId)) {
    errors.throwError('WalletListError', {
      message: `Wallet with id "${walletId}" not found among the initialized wallets`,
    })
  }
}

export const checkInitialization = () => {
  !state.getState('isInitialized') &&
    errors.throwError('LibraryError', {
      message: 'Library is not initialized. Run init() method before using',
    })
}
