import { BaseCosmosNetwork } from '../../_BaseCosmosClass'
import {
  signTxByPrivateKey,
  createMessageSignature,
  signTxByLedger,
} from './ethSigners'
import { BaseEthNetwork } from '../../../ethNetworks/_BaseEthClass'
import { EthNetwork } from '../../../ethNetworks/EthClass'
import { getCosmosAddressFromEthAddress } from './functions'
import { ECPair } from 'bitcoinjs-lib'
import { WALLET_TYPES } from '../../../../constants'

export class BaseCosmoEtheriumNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction = rawTransaction.transaction || rawTransaction
    // own ledger signature
    if (this.type === WALLET_TYPES.LEDGER) {
      return signTxByLedger(transaction, derivationPath, this.publicKey)
    }
    // etherium privateKey signer (etherium class uses a different implementation)
    return signTxByPrivateKey(transaction, this.publicKey, privateKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    // parent's ledger signature
    if (this.type === WALLET_TYPES.LEDGER) {
      return super.createMessageSignature(data, { derivationPath })
    }
    // own privateKey signature
    return createMessageSignature(data, privateKey)
  }

  static async createWalletByMnemonic(options, specialKey) {
    // wallet creation function like etherium
    const wallet = await BaseEthNetwork.createWalletByMnemonic.call(
      // bind the context to create a ninstance of the current net
      this,
      options
    )
    // but with modified address
    wallet.address = getCosmosAddressFromEthAddress(wallet.address, specialKey)
    // and privateKey without '0x'
    wallet.privateKey = wallet.privateKey.replace('0x', '')
    // and the public key is generated differently
    wallet.publicKey = ECPair.fromPrivateKey(
      Buffer.from(wallet.privateKey, 'hex')
    ).publicKey.toString('hex')
    return wallet
  }

  static async createWalletByPrivateKey(options, specialKey) {
    // wallet creation function like etherium
    const wallet = await BaseEthNetwork.createWalletByPrivateKey.call(
      // bind the context to create a ninstance of the current net
      this,
      options
    )
    // but with modified address
    wallet.address = getCosmosAddressFromEthAddress(wallet.address, specialKey)
    // and privateKey without '0x'
    wallet.privateKey = wallet.privateKey.replace('0x', '')
    // and the public key is generated differently
    wallet.publicKey = ECPair.fromPrivateKey(
      Buffer.from(wallet.privateKey, 'hex')
    ).publicKey.toString('hex')
    return wallet
  }

  static async createWalletByLedger(options, specialKey) {
    // wallet creation function like etherium
    const wallet = await EthNetwork.createWalletByLedger.call(
      // bind the context to create a ninstance of the current net
      this,
      options
    )
    // but with modified address
    wallet.address = getCosmosAddressFromEthAddress(wallet.address, specialKey)
    let publicKey = Buffer.from(wallet.publicKey, 'hex');
    if (publicKey.length !== 33) {
      publicKey = [...publicKey];
      publicKey = publicKey.slice(1, 33);
      publicKey.unshift(2);
      publicKey = Buffer.from(publicKey).toString('hex');
    }
    wallet.publicKey = publicKey
    return wallet
  }

  async prepareTransfer(options){
    return super.prepareTransfer({...options, isTyped: true})
  }

  async prepareDelegation(options){
    return super.prepareDelegation({...options, isTyped: true})
  }

  async prepareCrossNetworkTransfer(token, options){
    return super.prepareCrossNetworkTransfer(token, {...options, isTyped: true})
  }

  async prepareClaim(){
    return super.prepareClaim({isTyped: true})
  }
}
