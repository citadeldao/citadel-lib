import errors from '../../errors'
import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
import { BaseNetwork } from '../_BaseNetworkClass'
import { WALLET_TYPES, CACHE_NAMES } from '../../constants'
import { signTxByPrivateKey, signTxByLedger } from './signers'
import { getLedgerTransport } from "../../ledgerTransportProvider";
import storage from '../../storage'
import { ledgerErrorHandler } from "./signers/functions"

const bip39 = require('bip39');
const ed25519 = require('ed25519-hd-key');
const CryptoJS = require("crypto-js");
const solanaWeb3 = require("@solana/web3.js");
const bs58 = require('bs58');

export class SolanaNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://solscan.io/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://solscan.io/tx/${hash}`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, transportType, btcAddress }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return await signTxByLedger(transaction, derivationPath, rightApp, transportType, btcAddress)
    }
    // trezor signer
    if (this.type === WALLET_TYPES.TREZOR) {
      return await signTxByTrezor(transaction, derivationPath)
    }
    // privateKey signer
    console.log('trrr', transaction);
    return await signTxByPrivateKey(transaction, privateKey)
  }

  // btc not support stake
  getStakeList() {
    errors.throwError('MethodNotSupported', {
      method: 'getStakeList',
      net: this.net,
    })
  }

  // btc not support stake
  getDelegationFee() {
    errors.throwError('MethodNotSupported', {
      method: 'getDelegationFee',
      net: this.net,
    })
  }

  // btc not support stake
  static getStakeNodes() {
    errors.throwError('MethodNotSupported', {
      method: 'getStakeNodes',
      net: this.net,
    })
  }

  static calculateBalance({ mainBalance = 0 } = {}) {
    return mainBalance
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
    oneSeed = true,
  }) {
    const masterSeed = bip39.mnemonicToSeedSync(mnemonic, passphrase);
    const derivedSeed = ed25519.derivePath(derivationPath, masterSeed.toString('hex')).key;
    const keypair = solanaWeb3.Keypair.fromSeed(derivedSeed);
    const address = keypair.publicKey.toBase58(); // адрес
    const privateKey = Buffer.from(keypair.secretKey).toString('hex');
    
    return {
      net: this.net,
      address,
      publicKey: keypair.publicKey.toString('hex'),
      derivationPath,
      privateKey,
      type: oneSeed ? WALLET_TYPES.ONE_SEED : WALLET_TYPES.SEED_PHRASE,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(mnemonic),
      }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    try {
      const buffPrv = Buffer.from(privateKey, 'hex');
      const kPair = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(buffPrv));
      const address = kPair.publicKey.toBase58();
      const publicKey = kPair.publicKey.toString('hex');

      return {
        net: this.net,
        address,
        publicKey,
        privateKey: privateKey,
        derivationPath: null,
        type: WALLET_TYPES.PRIVATE_KEY,
        // add network info
        code: this.code,
        methods: this.methods,
        networkName: this.networkName,
        // add optional properties from networks.json
        ...(this.fee_key && { fee_key: this.fee_key }),
        ...(this.bridges && { bridges: this.bridges }),
        // additional fields for chrome extension
        ...(state.getState('isExtension') && {
          hashedMnemonic: hashMnemonic(),
        }),
      }
    } catch (error) {
      // error means invalid private key
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
  }

  static async createWalletByLedger({ derivationPath, transportType }) {
    // dynamic import of large module (for fast init)
    const { default: SolanaApp } = await import('@ledgerhq/hw-app-solana')

    // add global btc ledger app to avoid ledger reconnect error
    let transport
    if (!global.ledger_solana) {
      transport = await getLedgerTransport(transportType)
      global.ledger_solana = new SolanaApp(transport);
    }
    
    let res;
    let addressAndPubKey;

    try{
      // generate address and public key
      res = await global.ledger_solana.getAddress(derivationPath)
      addressAndPubKey = bs58.encode(res.address);
    }catch(error){
      ledgerErrorHandler({ error, rightApp: this.ledger})
    }finally{
      if(transportType === 'usb'){
        if(global.ledger_solana) global.ledger_solana = null
        if(transport) await transport.close()
      }
    }
    
    return {
      net: this.net,
      address: addressAndPubKey,
      publicKey: addressAndPubKey,
      
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      // add network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }

  static async decodePrivateKeyByPassword(encodedPrivateKey, password) {
    return await super.decodePrivateKeyByPassword(encodedPrivateKey, password);
  }

  static async encodePrivateKeyByPassword(privateKey, password) {
   return await super.encodePrivateKeyByPassword(
      privateKey,
      password
    )
  }
}
