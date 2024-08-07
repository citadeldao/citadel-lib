import api from '../../api'
import { BaseNetwork } from '../_BaseNetworkClass'
import { WALLET_TYPES, DELEGATION_TYPES, CACHE_NAMES } from '../../constants'
import { signTxByPrivateKey, signTxByLedger } from './signers'
import { checkDelegationTypes } from '../../helpers/checkArguments'
import { ledgerErrorHandler } from './signers/functions'
import { getLedgerTransport } from "../../ledgerTransportProvider";
import storage from '../../storage'

export class SuiNetwork extends BaseNetwork {
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
    let delegations
    if(type === DELEGATION_TYPES.STAKE){
      delegations = [
        {
          address: nodeAddresses[0],
          value: amount
        },
      ]
    }else{
      delegations = nodeAddresses.map(item => { return {stakedSuiId: item}})
    }
    const { data } = await api.requests.prepareDelegations({
      from: this.address,
      net: this.net,
      delegations,
      publicKey: this.publicKey,
    })

    return data
  }

  getScannerLinkById() {
    return `https://suiscan.xyz/mainnet/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://suiscan.xyz/mainnet/tx/${hash}`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, transportType }) {
    const transaction = rawTransaction.transaction || rawTransaction
    // const transaction = await tranformTransaction(
    //   rawTransaction.transaction || rawTransaction
    // )
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return await signTxByLedger(transaction, derivationPath, this.publicKey, rightApp, transportType)
    }
    return await signTxByPrivateKey(transaction, privateKey)
  }

  async createMessageSignature(rawTransaction, { privateKey, derivationPath, transportType }) {
    let data

    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger
      data = await signTxByLedger(rawTransaction, derivationPath, this.publicKey, rightApp, transportType)
    }else {
      // privateKey signer
      data = await signTxByPrivateKey(rawTransaction, privateKey)
    }

    return data.signature
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    oneSeed = true,
  }) {
    // dynamic import of large module (for fast init)
    const { Ed25519Keypair } = await import('@mysten/sui.js');
    const { fromB64 } = await import('@mysten/bcs');
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic, derivationPath)
    const address = keypair.getPublicKey().toSuiAddress()
    const privateKey = `0x${Buffer.from(fromB64(keypair.export().privateKey).slice(0, 32)).toString('hex')}`
    const publicKey = Buffer.from(keypair.getPublicKey().toBytes()).toString('hex')

    return {
      net: this.net,
      address,
      publicKey,
      derivationPath,
      privateKey,
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
    const { Ed25519Keypair } = await import('@mysten/sui.js');
    const { fromHEX } = await import('@mysten/bcs');
    const keypair = Ed25519Keypair.fromSecretKey(fromHEX(privateKey))
    const address = keypair.getPublicKey().toSuiAddress()
    const publicKey = Buffer.from(keypair.getPublicKey().toBytes()).toString('hex')
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

  static async createWalletByLedger({ derivationPath, transportType }) {
    const { default: SuiApp } = await import('@mysten/ledgerjs-hw-app-sui')
    const { Ed25519PublicKey } = await import('@mysten/sui.js');
    const transport = await getLedgerTransport(transportType)
    const suiApp = new SuiApp(transport)
    let res
    let address
    let publicKey
    try{
      res = await suiApp.getPublicKey(derivationPath)
      const keyPair = new Ed25519PublicKey(res.publicKey);
      address = keyPair.toSuiAddress();
      publicKey = Buffer.from(keyPair.toBytes()).toString('hex')
    }catch(error){
      ledgerErrorHandler({ error, rightApp: this.ledger})
    }finally{
      if(transportType === 'usb'){
        if(transport) await transport.close()
      }
    }

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
