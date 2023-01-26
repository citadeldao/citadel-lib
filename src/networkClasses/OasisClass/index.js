import api from '../../api'
import { BaseNetwork } from '../_BaseNetworkClass'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../constants'
import OasisApp from '@oasisprotocol/ledger'
import { getHdDerivationPath } from '../_functions/ledger'
import { signTxByPrivateKey, signTxByLedger } from './signers'
import { checkDelegationTypes } from '../../helpers/checkArguments'
import { tranformTransaction } from './signers/functions'
import {getLedgerTransport} from "../../ledgerTransportProvider";

export class OasisNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async prepareDelegation({
    nodeAddresses,
    amount,
    type = DELEGATION_TYPES.STAKE,
  }) {
    // check type
    checkDelegationTypes(type)

    // stake and unstake
    // send difference of values
    const { data } = await api.requests.prepareDelegations({
      from: this.address,
      net: this.net,
      delegations: [
        {
          address: nodeAddresses[0],
          value:
            type === DELEGATION_TYPES.STAKE
              ? amount
              : // unstake
                `-${amount}`,
        },
      ],
      publicKey: this.publicKey,
    })

    return data
  }

  getScannerLinkById() {
    return `https://www.oasisscan.com/accounts/detail/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://www.oasisscan.com/transactions/${hash}`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction = await tranformTransaction(
      rawTransaction.transaction || rawTransaction
    )
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath, this.publicKey)
    }
    return signTxByPrivateKey(transaction, privateKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    const formatedTx = await tranformTransaction(data)
    let signedTx
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      signedTx = await signTxByLedger(formatedTx, derivationPath, this.publicKey)
    } else {
      // privateKey signer
      signedTx = await signTxByPrivateKey(formatedTx, privateKey)
    }

    return Buffer.from(signedTx.signature.signature).toString('hex')
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
    oneSeed = true,
  }) {
    const HDDerPath = derivationPath.split('/')
    const derPathIndex = parseInt(HDDerPath[HDDerPath.length - 1])
    // dynamic import of large module (for fast init)
    const { hdkey, staking } = await import('@oasisprotocol/client')
    const signer = await hdkey.HDKey.getAccountSigner(
      mnemonic,
      derPathIndex,
      passphrase
    )
    const privateKey = Buffer.from(signer.secretKey).toString('base64')
    const publicKey = Buffer.from(signer.publicKey).toString('hex')
    const data = await staking.addressFromPublicKey(signer.publicKey)
    const address = staking.addressToBech32(data)

    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey: privateKey,
      type: oneSeed ? WALLET_TYPES.ONE_SEED : WALLET_TYPES.SEED_PHRASE,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    // dynamic import of large module (for fast init)
    const { staking } = await import('@oasisprotocol/client')
    const { default: nacl } = await import('tweetnacl')
    const publicKeyBytes = nacl.sign.keyPair.fromSecretKey(
      Buffer.from(privateKey, 'base64')
    ).publicKey

    const data = await staking.addressFromPublicKey(publicKeyBytes)
    const address = staking.addressToBech32(data)
    const publicKey = Buffer.from(publicKeyBytes).toString('hex')
    return {
      net: this.net,
      address,
      publicKey,
      privateKey,
      derivationPath: null,
      type: WALLET_TYPES.PRIVATE_KEY,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByLedger({ derivationPath }) {
    const transport = await getLedgerTransport()
    const app = new OasisApp(transport)
    console.log('test111', await app.appInfo());
    const hdPathArray = getHdDerivationPath(derivationPath)
   
    const resp = await app.publicKey(hdPathArray)
    console.log('tes22', resp);
    if (resp?.result === 'error') {
      const error = new Error(resp.error.message)
      throw error
    }
    // dynamic import of large module (for fast init)
    const { staking } = await import('@oasisprotocol/client')
    const data = await staking.addressFromPublicKey(resp.pk)
    const address = staking.addressToBech32(data)
    const publicKey = Buffer.from(resp.pk).toString('hex')
    await transport.close()
    return {
      net: this.net,
      address,
      publicKey,
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }
}
