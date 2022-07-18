import { executeContract } from './executeContract'

export async function doTokenTransfer({
  address,
  contractAddress,
  decimals,
  publicKey,
  privateKey,
  derivationPath,
  type,
  toAddress,
  amount,
  fee,
}) {
  // constant?
  const gasPriceInFeeDenom = 0.04
  const gasLimit = Math.ceil((fee / gasPriceInFeeDenom) * 10 ** decimals)
  // try {
  const transactionHash = await executeContract({
    address,
    contractAddress,
    message: {
      transfer: {
        recipient: toAddress,
        amount: `${+amount * 10 ** decimals}`,
      },
    },
    // sentFunds,
    gasLimit: {
      gasLimit,
      gasPriceInFeeDenom,
    },
    privateKey,
    derivationPath,
    type,
    publicKey,
  })
  return [transactionHash]
}
