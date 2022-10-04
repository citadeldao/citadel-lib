import api from '../../api'
import { BaseNetwork } from '../_BaseNetworkClass'
import * as oasis from '@oasisprotocol/client'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../constants'
import nacl from 'tweetnacl'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import OasisApp from '@oasisprotocol/ledger'
import { getHdDerivationPath } from '../_functions/ledger'
import { signTxByPrivateKey, signTxByLedger } from './signers'
import { checkDelegationTypes } from '../../helpers/checkArguments'
import { tranformTransaction } from './signers/functions'

export class OasisNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async prepareDelegation({
    nodeAddress,
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
          address: nodeAddress,
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

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
  }) {
    const HDDerPath = derivationPath.split('/')
    const derPathIndex = parseInt(HDDerPath[HDDerPath.length - 1])

    const signer = await oasis.hdkey.HDKey.getAccountSigner(
      mnemonic,
      derPathIndex,
      passphrase
    )
    const privateKey = Buffer.from(signer.secretKey).toString('base64')
    const publicKey = Buffer.from(signer.publicKey).toString('hex')
    const data = await oasis.staking.addressFromPublicKey(signer.publicKey)
    const address = oasis.staking.addressToBech32(data)

    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey: privateKey,
      type: WALLET_TYPES.ONE_SEED,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    const publicKeyBytes = nacl.sign.keyPair.fromSecretKey(
      Buffer.from(privateKey, 'base64')
    ).publicKey
    const data = await oasis.staking.addressFromPublicKey(publicKeyBytes)
    const address = oasis.staking.addressToBech32(data)
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
    const transport = await TransportWebUSB.create(1000)
    const app = new OasisApp(transport)
    const hdPathArray = getHdDerivationPath(derivationPath)
    const resp = await app.publicKey(hdPathArray)
    if (resp?.result === 'error') {
      const error = new Error(resp.error.message)
      throw error
    }
    const data = await oasis.staking.addressFromPublicKey(resp.pk)
    const address = oasis.staking.addressToBech32(data)
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

  async createMessageSignature(data, { privateKey, derivationPath }) {
    let signedTx
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      signedTx = await signTxByLedger(data, derivationPath, this.publicKey)
    }else{
      // privateKey signer
      signedTx = await signTxByPrivateKey(data, privateKey)
    }
    
    return Buffer.from(signedTx.signature.signature).toString('hex')  
  }
}
