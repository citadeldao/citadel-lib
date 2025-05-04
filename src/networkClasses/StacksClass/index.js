import { BaseNetwork } from '../_BaseNetworkClass'
import { getStxAddress, generateWallet, Wallet, deriveAccount, getRootNode, DerivationType } from '@stacks/wallet-sdk';
import {
    TransactionVersion,
    pubKeyfromPrivKey,
    publicKeyToString,
    deserializeTransaction,
    TransactionSigner,
    createStacksPrivateKey,
} from '@stacks/transactions';
import { publicKeyToBtcAddress } from '@stacks/encryption';

import { checkDelegationTypes } from '../../helpers/checkArguments'
import api from '../../api'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../constants'

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
    const transaction = rawTransaction.transaction || rawTransaction?.txs[0]?.tx || rawTransaction;
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
    
    const derivation = +derivationPath.split('/').reverse()[0];
    const account = generateAccount(wallet, derivation);
    const address = getStxAddress({ account, transactionVersion: TransactionVersion.Mainnet });
    const privateKey = account.stxPrivateKey;
    const publicKey = publicKeyToString(pubKeyfromPrivKey(account.stxPrivateKey));
    const btcAddress = publicKeyToBtcAddress(publicKey);

    return {
      net: this.net,
      address,
      btcAddress,
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

  async prepareDelegation({
    nodeAddresses,
    amount,
    type = DELEGATION_TYPES.STAKE,
    redelegateNodeAddresses,
    isTyped = false,
  }) {
    // check type
    checkDelegationTypes(type)
    const nodeAddress = nodeAddresses[0]
    const redelegateNodeAddress = redelegateNodeAddresses?.[0]

    // redelegation
    if (type === DELEGATION_TYPES.REDELEGATE) {
      const { data } = await api.requests.prepareRedelegation({
        address: this.address,
        net: this.net,
        from: nodeAddress,
        to: redelegateNodeAddress,
        amount,
        publicKey: this.publicKey,
        isTyped,
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
              ? amount
              : // unstake
                `-${amount}`,
        },
      ],
      publicKey: this.publicKey,
      isTyped,
    })

    return data
  }

  async prepareClaim(isTyped = false) {
    const { data } = await api.requests.prepareClaim({
      net: this.net,
      address: this.address,
      isTyped,
    })

    return data
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
