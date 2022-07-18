// import errors from '../../../../errors'
// import {
//   VIEWING_KEYS_TYPES,
//   COSM_WASM_CLIENT_HTTP_URL,
// } from '../../../../constants'
// import { checkTypes } from '../../../../helpers/checkArguments'
// import crypto from 'crypto'
// import { EnigmaUtils, SigningCosmWasmClient, BroadcastMode } from 'secretjs'
// import { getSigner } from './getSigner'
// import { getFeeObject } from './getFeeObject'
// import { generateSimpleViewingKey } from './generateSimpleViewingKey'
// import { sleep } from '../../../../helpers/sleep'
// import { getTokenBalance } from './getTokenBalance'
// import { GRPC_WEB_URL } from '../../../../constants'
// import {
//   SecretNetworkClient,
//   Wallet
// } from 'secretjs'
// import { getSignerWallet } from './functions/getSignerWallet'
// const crypto_1 = require('@iov/crypto')

export async function setViewingKey(
  viewingKeyType,
  {
    address,
    contractAddress,
    type,
    publicKey,
    privateKey,
    privateKeyHash,
    derivationPath,
    viewingKey,
    fee,
    decimals,
  } = {}
) {
  console.log(viewingKeyType, {
    address,
    contractAddress,
    type,
    publicKey,
    privateKey,
    privateKeyHash,
    derivationPath,
    viewingKey,
    fee,
    decimals,
  })

  try {
    // const signerWallet = await getSignerWallet({
    //   privateKey,
    //   derivationPath,
    //   type,
    //   publicKey,
    //   address,
    // })

    // // prepare secret client
    // const secretjs = await SecretNetworkClient.create({
    //   grpcWebUrl: GRPC_WEB_URL,
    //   chainId: 'secret-4',
    //   // wallet: signerWallet,
    //   wallet: signerWallet,
    //   walletAddress: address,
    // })

    // // get contract codeHash
    // const codeHash = await secretjs.query.compute.contractCodeHash(
    //   contractAddress
    // )

    // // execute contract
    // const tx = await secretjs.tx.compute.executeContract(
    //   {
    //     sender: address,
    //     contractAddress,
    //     codeHash: codeHash, // optional but way faster
    //     msg: {
    //       transfer: {
    //         recipient: address,
    //         amount: '1',
    //       },
    //     },
    //     sentFunds: [], // optional
    //   },
    //   {
    //     gasLimit: 100_000,
    //   }
    // )

    // console.log('tx', tx)
    // const txEncryptionSeed = EnigmaUtils.GenerateNewSeed()
    // const signer = await getSigner({
    //   privateKey,
    //   derivationPath,
    //   type,
    //   publicKey,
    // })
    // let transactionHash = null
    // switch (viewingKeyType) {
    //   // set simple viewing key
    //   case VIEWING_KEYS_TYPES.SIMPLE: {
    //     const client = new SigningCosmWasmClient(
    //       COSM_WASM_CLIENT_HTTP_URL,
    //       address,
    //       signer,
    //       txEncryptionSeed,
    //       getFeeObject(fee),
    //       // do not wait for the transaction to be included in the block, return the hash (prevent timeout error)
    //       BroadcastMode.Async
    //     )
    //     const simpleViewingKey = generateSimpleViewingKey(
    //       contractAddress,
    //       privateKeyHash
    //     )
    //     const response = await client.execute(contractAddress, {
    //       set_viewing_key: {
    //         key: simpleViewingKey,
    //       },
    //     })
    //     transactionHash = response.transactionHash
    //     viewingKey = simpleViewingKey
    //     break
    //   }
    //   // set custom viewing key
    //   case VIEWING_KEYS_TYPES.CUSTOM: {
    //     checkTypes(['viewingKey', viewingKey, ['String'], true])
    //     const client = new SigningCosmWasmClient(
    //       COSM_WASM_CLIENT_HTTP_URL,
    //       address,
    //       signer,
    //       txEncryptionSeed,
    //       getFeeObject(fee),
    //       // do not wait for the transaction to be included in the block, return the hash (prevent timeout error)
    //       BroadcastMode.Async
    //     )
    //     const response = await client.execute(contractAddress, {
    //       set_viewing_key: {
    //         key: viewingKey,
    //       },
    //     })
    //     transactionHash = response.transactionHash
    //     break
    //   }
    //   // set random viewing key
    //   case VIEWING_KEYS_TYPES.RANDOM: {
    //     const client = new SigningCosmWasmClient(
    //       COSM_WASM_CLIENT_HTTP_URL,
    //       address,
    //       signer,
    //       txEncryptionSeed,
    //       getFeeObject(fee)
    //       // wait tranaction to get generated key
    //     )
    //     // const entropy = cryptoRandomString({ length: 64, type: 'base64' })
    //     const entropy = crypto.randomBytes(64).toString('base64')
    //     const response = await client.execute(contractAddress, {
    //       create_viewing_key: {
    //         entropy,
    //       },
    //     })
    //     const {
    //       create_viewing_key: { key: randomViewingKey },
    //     } = JSON.parse(Buffer.from(response.data).toString('utf-8'))
    //     transactionHash = response.transactionHash
    //     viewingKey = randomViewingKey
    //     break
    //   }
    //   default: {
    //     errors.throwError('WrongArguments', {
    //       message: `Invalid viewingKey type. Expected '${Object.values(
    //         VIEWING_KEYS_TYPES
    //       ).join(', ')}', got '${viewingKeyType}'`,
    //     })
    //   }
    // }
    // // do not check random key - its method is already waiting for the transaction to pass
    // if (transactionHash && viewingKeyType !== VIEWING_KEYS_TYPES.RANDOM) {
    //   // wait for the key to be installed before saving it to the instance
    //   const PAUSE_BETWEEN_CHECKS = 2000
    //   const MAX_NUMBER_OF_CHECKS = 30
    //   let currentСheckТumber = 0
    //   // let balance = { calculatedBalance: 0, mainBalance: 0 }
    //   while (currentСheckТumber < MAX_NUMBER_OF_CHECKS) {
    //     // try to get balance with settable key
    //     const { error } = await getTokenBalance(
    //       address,
    //       contractAddress,
    //       decimals,
    //       viewingKey
    //     )
    //     // break on success
    //     if (!error) {
    //       break
    //     }
    //     // try again
    //     await sleep(PAUSE_BETWEEN_CHECKS)
    //     currentСheckТumber++
    //   }
    // }
    // return { transactionHash, viewingKey }
  } catch (error) {
    console.error(error)
    // if (error.name === 'WrongArguments') {
    //   throw error
    // }
    // errors.throwError('ViewingKeyError', {
    //   message: `Viewing key setting faild. ${error.message}`,
    // })
  }
}
