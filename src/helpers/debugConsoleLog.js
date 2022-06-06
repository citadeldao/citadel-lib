import state from '../state'

// console logs only when the debug flag is set to true
export const debugConsoleLog = (...args) => {
  if (!state.getState('debug')) return

  if (state.getState('stringifyLogs')) {
    return console.log(...args.map((arg) => JSON.stringify(arg)))
  }

  console.log(...args)
}
