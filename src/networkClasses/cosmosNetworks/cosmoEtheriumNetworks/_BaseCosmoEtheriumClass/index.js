import { BaseCosmosNetwork } from '../../_BaseCosmosClass'
import {
  signTxByPrivateKey,
  createMessageSignature,
  signTxByLedger,
} from './ethSigners'
import { BaseEthNetwork } from '../../../ethNetworks/_BaseEthClass'
import { EthNetwork } from '../../../ethNetworks/EthClass'
import { getCosmosAddressFromEthAddress } from './functions'
import { WALLET_TYPES, CACHE_NAMES } from '../../../../constants'
import storage from '../../../../storage'

export class BaseCosmoEtheriumNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction = rawTransaction.transaction || rawTransaction
    // own ledger signature
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return signTxByLedger(transaction, derivationPath, this.publicKey, rightApp)
    }
    // etherium privateKey signer (etherium class uses a different implementation)
    return signTxByPrivateKey(transaction, this.publicKey, privateKey)
  }

  async createMessageSignature(data, { privateKey, derivationPath }) {
    // parent's ledger signature
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      const signature = await signTxByLedger(
        data.typedMessage,
        derivationPath,
        this.publicKey,
        rightApp
      )
      return signature.signature.slice(0, 2) === '0x'
        ? signature.signature
        : `0x${signature.signature}`
    }
    // own privateKey signature
    return createMessageSignature(data.originalCosmosMsg, privateKey)
  }

  static async createWalletByMnemonic(options) {
    // dynamic import of large module (for fast init)
    const { ECPair } = await import('bitcoinjs-lib')
    // wallet creation function like etherium
    const wallet = await BaseEthNetwork.createWalletByMnemonic.call(
      // bind the context to create a ninstance of the current net
      this,
      options
    )
    // but with modified address
    wallet.address = await getCosmosAddressFromEthAddress(
      wallet.address,
      this.netPrefix
    )
    // and privateKey without '0x'
    wallet.privateKey = wallet.privateKey.replace('0x', '')
    // and the public key is generated differently
    wallet.publicKey = ECPair.fromPrivateKey(
      Buffer.from(wallet.privateKey, 'hex')
    ).publicKey.toString('hex')
    return wallet
  }

  static async createWalletByPrivateKey(options) {
    // dynamic import of large module (for fast init)
    const { ECPair } = await import('bitcoinjs-lib')
    // wallet creation function like etherium
    const wallet = await BaseEthNetwork.createWalletByPrivateKey.call(
      // bind the context to create a ninstance of the current net
      this,
      options
    )
    // but with modified address
    wallet.address = await getCosmosAddressFromEthAddress(
      wallet.address,
      this.netPrefix
    )
    // and privateKey without '0x'
    wallet.privateKey = wallet.privateKey.replace('0x', '')
    // and the public key is generated differently
    wallet.publicKey = ECPair.fromPrivateKey(
      Buffer.from(wallet.privateKey, 'hex')
    ).publicKey.toString('hex')
    return wallet
  }

  static async createWalletByLedger(options) {
    // wallet creation function like etherium
    const wallet = await EthNetwork.createWalletByLedger.call(
      // bind the context to create a ninstance of the current net
      this,
      options
    )
    // but with modified address
    wallet.address = await getCosmosAddressFromEthAddress(wallet.address, this.netPrefix)
    let publicKey = wallet.publicKey
    if (publicKey.length !== 66) {
      publicKey = publicKey.slice(2, 66)
      const yCord = parseInt(
        wallet.publicKey[wallet.publicKey.length - 1],
        16
      ).toString(2)
      publicKey =
        yCord[yCord.length - 1] === '0' ? `02${publicKey}` : `03${publicKey}`
    }
    wallet.publicKey = publicKey
    return wallet
  }

  async prepareTransfer(options) {
    return super.prepareTransfer({
      ...options,
      isTyped: this.type === WALLET_TYPES.LEDGER,
    })
  }

  async prepareDelegation(options) {
    return super.prepareDelegation({
      ...options,
      isTyped: this.type === WALLET_TYPES.LEDGER,
    })
  }

  async prepareCrossNetworkTransfer(token, options) {
    return super.prepareCrossNetworkTransfer(token, {
      ...options,
      isTyped: this.type === WALLET_TYPES.LEDGER,
    })
  }

  async prepareClaim() {
    return super.prepareClaim(this.type === WALLET_TYPES.LEDGER)
  }
}
