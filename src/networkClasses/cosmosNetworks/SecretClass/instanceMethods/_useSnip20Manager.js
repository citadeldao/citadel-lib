// use for prepare and signAndSend actions, wich execute on clien
// snip20Manager moved to a separate module for reuse in static methods
export async function _useSnip20Manager({ method, ...methodArguments }) {
  // dynamic import module with huge npm package
  const { default: snip20Manager } = await import('../snip20Manager')
  return await snip20Manager[method](methodArguments)
}
