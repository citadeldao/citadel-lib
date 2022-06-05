import BaseCosmosNetwork from '../../_BaseCosmosClass'
import {
  signTxByPrivateKey,
  createMessageSignature,
  signTxByLedger,
} from './ethSigners'
import BaseEthWallet from '../../../ethNetworks/_BaseEthClass'
import { getCosmosAddressFromEthAddress } from './functions'
import { ECPair } from 'bitcoinjs-lib'
import { WALLET_TYPES } from '../../../../../constants'

export default class BaseCosmoEtheriumClass extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    const transaction = rawTransaction.transaction || rawTransaction
    //Подпись леджером отличаеться от родителя
    if (this.type === WALLET_TYPES.LEDGER) {
      return signTxByLedger(transaction, derivationPath, this.publicKey)
    }
    // подпись эфирная (хотя в эфирном класе используется другая реализация)
    return signTxByPrivateKey(transaction, this.publicKey, privateKey)
  }

  // отличается от родителя только подписью по приватному кулючу
  async createMessageSignature(data, { privateKey, derivationPath }) {
    // леждер как у родителя (космоса)
    if (this.type === WALLET_TYPES.LEDGER) {
      return super.createMessageSignature(data, { derivationPath })
    }
    // подпись сообщения космо-эфирная
    return createMessageSignature(data, privateKey)
  }

  static async createWalletByMnemonic(options, specialKey) {
    // функция создания кошелька как у эфира
    const wallet = await BaseEthWallet.createWalletByMnemonic.call(
      // привязываем контекст чтобы создался инстанс инжектива а не эфира
      this,
      options
    )
    // но с модифицированным адресом
    wallet.address = getCosmosAddressFromEthAddress(wallet.address, specialKey)
    // и приватник без '0x'
    wallet.privateKey = wallet.privateKey.replace('0x', '')
    // публичный ключ рассчитывается по-другому
    wallet.publicKey = ECPair.fromPrivateKey(
      Buffer.from(wallet.privateKey, 'hex')
    ).publicKey.toString('hex')
    return wallet
  }

  static async createWalletByPrivateKey(options, specialKey) {
    // функция создания кошелька как у эфира
    const wallet = await BaseEthWallet.createWalletByPrivateKey.call(
      this,
      options
    )
    // но с модифицированным адресом
    wallet.address = getCosmosAddressFromEthAddress(wallet.address, specialKey)
    // и приватник без '0x'
    wallet.privateKey = wallet.privateKey.replace('0x', '')
    // публичный ключ рассчитывается по-другому
    wallet.publicKey = ECPair.fromPrivateKey(
      Buffer.from(wallet.privateKey, 'hex')
    ).publicKey.toString('hex')
    return wallet
  }
}
