import { BaseNetwork } from '../_BaseNetworkClass'
import { WALLET_TYPES } from '../../constants'
import { getStxAddress, generateWallet, Wallet, deriveAccount, getRootNode, DerivationType } from '@stacks/wallet-sdk';
import {
    TransactionVersion,
    pubKeyfromPrivKey,
    publicKeyToString,
    deserializeTransaction,
    TransactionSigner,
    createStacksPrivateKey,
} from '@stacks/transactions';

const generateAccount = (wallet, index) => {
  return deriveAccount({
      rootNode: getRootNode(wallet),
      index,
      salt: wallet.salt,
      stxDerivationType: DerivationType.Wallet,
  });
};

export class StacksNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://explorer.hiro.so/address/${this.address}?chain=mainnet`
  }

  getTransactionURLByHash(hash) {
    return `https://explorer.hiro.so/txid/${hash}?chain=mainnet`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, transportType }) {
    const transaction = rawTransaction.transaction || rawTransaction
    // if (this.type === WALLET_TYPES.LEDGER) {
    //    //rigth app for ledger
    //    const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

    //   return await signTxByLedger(transaction, derivationPath, rightApp, transportType)
    // }
    const deserializedTx = deserializeTransaction(transaction);

    const signer = new TransactionSigner(deserializedTx);
    signer.signOrigin(createStacksPrivateKey(privateKey));

    const serializedSignedTx = Buffer.from(deserializedTx.serialize()).toString('hex');
    return serializedSignedTx;
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
    oneSeed = true,
  }) {
    const wallet = await generateWallet({
      secretKey: mnemonic,
      password: '',
    });
  
    const account = generateAccount(wallet, 0);
    const address = getStxAddress({ account, transactionVersion: TransactionVersion.Mainnet });
    const privateKey = account.stxPrivateKey;
    const publicKey = publicKeyToString(pubKeyfromPrivKey(account.stxPrivateKey));

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

  // static async createWalletByPrivateKey({ privateKey }) {
  //   // dynamic import of large module (for fast init)
  //   const { default: TronWeb } = await import('tronweb')
  //   const address = await TronWeb.address.fromPrivateKey(privateKey)
  //   const publicKey = Buffer.from(
  //     await getPubKeyFromPriKey(hexStr2byteArray(privateKey))
  //   ).toString('hex')
  //   return {
  //     net: this.net,
  //     address,
  //     publicKey,
  //     privateKey,
  //     derivationPath: null,
  //     type: WALLET_TYPES.PRIVATE_KEY,
  //     // add network info
  //     code: this.code,
  //     methods: this.methods,
  //     networkName: this.networkName,
  //     ...(this.fee_key && { fee_key: this.fee_key }),
  //     ...(this.bridges && { bridges: this.bridges }),
  //   }
  // }

  // static async createWalletByLedger({ derivationPath, transportType }) {
  //   const transport = await getLedgerTransport(transportType)
  //   const tronApp = new Trx(transport)
    
  //   let res
  //   try{
  //     res = await tronApp.getAddress(derivationPath)
  //   }catch(error){
  //     ledgerErrorHandler({ error, rightApp: this.ledger})
  //   }finally{
  //     if(transportType === 'usb'){
  //       if(transport) await transport.close()
  //     }
  //   }
  //   return {
  //     net: this.net,
  //     address: res.address,
  //     publicKey: res.publicKey,
  //     privateKey: null,
  //     derivationPath,
  //     type: WALLET_TYPES.LEDGER,
  //     // add network info
  //     code: this.code,
  //     methods: this.methods,
  //     networkName: this.networkName,
  //     ...(this.fee_key && { fee_key: this.fee_key }),
  //     ...(this.bridges && { bridges: this.bridges }),
  //   }
  // }
}
