import api from '../../api'
import { BaseNetwork } from '../_BaseNetworkClass'
import { hdkey, staking } from '@oasisprotocol/client'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../constants'
import nacl from 'tweetnacl'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import OasisApp/* , { successOrThrow } */ from '@oasisprotocol/ledger'
import { getHdDerivationPath } from '../_functions/ledger'
import { signTxByPrivateKey/* , signTxByLedger, signTxByTrezor */ } from './signers'
import { checkDelegationTypes } from '../../helpers/checkArguments'

//import axios from 'axios'


export class OasisNetwork extends BaseNetwork {
    constructor(walletInfo) {
      super(walletInfo)
    }

    async prepareDelegation({
      nodeAddress,
      amount,
      type = DELEGATION_TYPES.STAKE,
      redelegateNodeAddress,
    }) {
      // check type
      checkDelegationTypes(type)
  
      // redelegation
      if (type === DELEGATION_TYPES.REDELEGATE) {
        const { data } = await api.requests.prepareRedelegation({
          address: this.address,
          net: this.net,
          from: nodeAddress,
          to: redelegateNodeAddress,
          amount: Math.abs(amount),
          publicKey: this.publicKey,
        })
        return data
      }
  
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
                ? Math.abs(amount)
                : // unstake
                  -Math.abs(amount),
          },
        ],
        publicKey: this.publicKey,
      })
  
      return data
    }
  
    // getScannerLinkById() {
    //   return `https://www.blockchain.com/ru/search?search=${this.address}`
    // }
  
    // getTransactionURLByHash(hash) {
    //   return `https://blockchair.com/bitcoin/transaction/${hash}`
    // }
  
    // async prepareTransfer(options) {
    //   checkTypes(['fee', options.fee, ['String', 'Number'], true])
    //   return await super.prepareTransfer(options)
    // }
  
    async signTransaction(rawTransaction, { privateKey/* , derivationPath */ }) {
      // const transaction = rawTransaction.transaction || rawTransaction
      // if (this.type === WALLET_TYPES.LEDGER) {
      //   return await signTxByLedger(transaction, derivationPath)
      // }
      // if (this.type === WALLET_TYPES.TREZOR) {
      //   return await signTxByTrezor(transaction, derivationPath)
      // }
      return signTxByPrivateKey(rawTransaction, privateKey)
    }

    // async prepareTransfer(/* options */) {
    //   const axiosInstance = axios.create({
    //     baseURL: 'https://work.3ahtim54r.ru/api',
    //     withCredentials: true,
    //   })
    //   const res  = await axiosInstance.get('/transactions/cosmos/qaq/prepare-redelegation?version=1.0.5', {})
    //   console.log('test',res);
    // }
  
    // getStakeList() {
    //   errors.throwError('MethodNotSupported', {
    //     method: 'getStakeList',
    //     net: this.net,
    //   })
    // }
  
    // getDelegationFee() {
    //   errors.throwError('MethodNotSupported', {
    //     method: 'getDelegationFee',
    //     net: this.net,
    //   })
    // }
  
    // static getStakeNodes() {
    //   errors.throwError('MethodNotSupported', {
    //     method: 'getStakeNodes',
    //     net: this.net,
    //   })
    // }
  
    // static calculateBalance({ mainBalance = 0 } = {}) {
    //   return mainBalance
    // }
  
    static async createWalletByMnemonic({
        mnemonic,
        derivationPath,
        passphrase = '',
    }) {
        const HDDerPath = derivationPath.split("/")
        const derPathIndex = parseInt(HDDerPath[HDDerPath.length-1]);
     
        const signer = await hdkey.HDKey.getAccountSigner(mnemonic, derPathIndex, passphrase)
        console.log(signer.secretKey,signer.publicKey);
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
        const publicKeyBytes = nacl.sign.keyPair.fromSecretKey(Buffer.from(privateKey,'base64')).publicKey
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
        const transport = await TransportWebUSB.create(1000)
        const app = new OasisApp(transport)
        const hdPathArray = getHdDerivationPath(derivationPath)
        const resp = await app.publicKey(hdPathArray)
        if (resp?.result === 'error') {
            const error = new Error(resp.error.message)
            throw error
          }
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
  
    // static async createWalletByTrezor({ derivationPath }) {
    //   await prepareTrezorConnection()
    //   const publicData = await TrezorConnect.getPublicKey({
    //     path: derivationPath,
    //     coin: 'btc',
    //   })
    //   !publicData.success &&
    //     errors.throwError('TrezorError', {
    //       message: publicData?.payload?.error,
    //     })
    //   const pub = publicData.payload.publicKey
    //   const buf = bip32PublicToEthereumPublic(Buffer.from(pub, 'hex'))
    //   const publicKey = buf.toString('hex')
  
    //   const data = await TrezorConnect.getAddress({
    //     path: derivationPath,
    //     showOnTrezor: true,
    //   })
  
    //   const { address } = data.payload
  
    //   return {
    //     net: this.net,
    //     address: address.toString(),
    //     publicKey,
    //     privateKey: null,
    //     derivationPath,
    //     type: WALLET_TYPES.TREZOR,
    //     // add network info
    //     code: this.code,
    //     methods: this.methods,
    //     networkName: this.networkName,
    //     ...(this.fee_key && { fee_key: this.fee_key }),
    //     ...(this.bridges && { bridges: this.bridges }),
    //   }
    // }
  }
  