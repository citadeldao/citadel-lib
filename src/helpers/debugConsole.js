import state from '../state'

// console logs only when the debug flag is set to true
export const debugConsole = {
  log(...args) {
    if (!state.getState('debug')) return

    if (state.getState('stringifyLogs')) {
      return console.log(...args.map((arg) => JSON.stringify(arg)))
    }

    console.log(...args)
  },
  warn(...args) {
    if (!state.getState('debug')) return

    if (state.getState('stringifyLogs')) {
      return console.warn(...args.map((arg) => JSON.stringify(arg)))
    }

    console.warn(...args)
  },
  error(...args) {
    if (!state.getState('debug')) return

    if (state.getState('stringifyLogs')) {
      return console.error(...args.map((arg) => JSON.stringify(arg)))
    }

    console.error(...args)
  },
}
