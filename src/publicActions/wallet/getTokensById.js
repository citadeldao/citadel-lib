// import {
//   checkTypes,
//   checkInitialization,
//   checkWalletId,
//   checkTokensSupport,
// } from '../../helpers/checkArguments'
// import walletInstances from '../../walletInstances'

// export const getTokensById = (walletId) => {
//   // checks
//   checkInitialization()
//   checkTypes(['walletId', walletId, ['String', 'Number'], true])
//   checkWalletId(walletId)
//   const walletInstance = walletInstances.getWalletInstanceById(walletId)
//   checkTokensSupport(walletInstance.net)

//   // call walletInstance method
//   return walletInstance.getTokens()
// }
