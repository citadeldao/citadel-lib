// use for prepare and signAndSend actions, which execute on client
import snip20Manager from '../snip20Manager'

// snip20Manager moved to a separate module for reuse in static methods
export async function useSnip20Manager({ method, ...methodArguments }) {
  return await snip20Manager[method](methodArguments)
}
