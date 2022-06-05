// use for prepare and signAndSend actions, wich execute on clien
import snip20Manager from '../snip20Manager'

export async function _useSnip20Manager({ method, ...methodArguments }) {
  return await snip20Manager[method](methodArguments)
}
