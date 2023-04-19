import { BaseCosmosNetwork } from './_BaseCosmosClass'
import { getLedgerTransport } from "../../ledgerTransportProvider";
// import { ledgerErrorHandler } from "./_BaseCosmosClass/functions"
import { /*getHdDerivationPath,*/ getBech32FromPK} from '../_functions/ledger'
import {CACHE_NAMES, WALLET_TYPES} from '../../constants'
import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
import storage from "../../storage";
import {
  signJsonByPrivateKey,
  signTxByPrivateKey
} from "./_BaseCosmosClass/signers";
import {
  signTxByPrivateKey as altSignTxByPrivateKey
} from "./_BaseCosmosClass/oldSigners";
import {
  ledgerErrorHandler
} from "./_BaseCosmosClass/functions";

export class ProvenanceNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, useAlternativeSigner }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger
console.log('test001');
      const { default: ProvenanceApp } = await import('@citadeldao/hw-app-hash')
      const transport = await getLedgerTransport()
      console.log('test002');
      const provenanceApp = new ProvenanceApp(transport)
      // const hdPath = getHdDerivationPath(derivationPath)

      console.log('test003');
      // make stapshot of deafult tx
      const txSnapshot = JSON.parse(JSON.stringify(transaction))
      // remove granter kay from tx
      if(transaction.json?.fee?.granter) delete transaction.json.fee.granter;

      console.log('test004');
      const resp = await provenanceApp.signTransaction(
          derivationPath,
          Buffer.from(transaction.bytes)
      )
      console.log('test005');
      if (!resp.signature) {
        const appInfo = await provenanceApp.appInfo()
        await transport.close()
        ledgerErrorHandler({ appInfo, resp, rightApp })
      }
      console.log('test006', resp);
      await transport.close()
      // dynamic import for guge module
      // const { default: secp256k1 } = await import('secp256k1')
      // const parsedSignature = secp256k1.signatureImport(resp.signature)

      console.log('test007');
      let signMessage = new Object()
      if (
          transaction?.json?.msgs?.[0]?.type === 'irishub/bank/Send' ||
          transaction?.json?.msgs?.[0]?.type === 'irishub/stake/BeginUnbonding' ||
          transaction?.json?.msgs?.[0]?.type === 'irishub/stake/BeginRedelegate'
      ) {
        signMessage = transaction.jsonForSigningIrisTx
      } else {
        signMessage = transaction.json
      }

      const signatureParsed = Buffer.from(resp.signature).toString('hex')
      // const signMessage = rawTransaction.json
      const signedTx = {
        ...signMessage,
        // get default tx fee key
        fee: txSnapshot.json.fee,
        signature: signatureParsed,
        publicKey: this.publicKey,
        memo: transaction.json.memo,
        mode: 'sync',
      }

      return signedTx
    }
    // privateKey signer
    if(useAlternativeSigner){
      return altSignTxByPrivateKey(transaction, privateKey, this.publicKey)
    }
    if (!transaction.bytes) {
      return await signJsonByPrivateKey(transaction, privateKey, this.publicKey)
    }
    return signTxByPrivateKey(transaction, privateKey, this.publicKey)
  }

  static async createWalletByLedger({ derivationPath }) {
    
    const transport = await getLedgerTransport()
    const { default: ProvenanceApp } = await import('@citadeldao/hw-app-hash')
    const provenanceApp = new ProvenanceApp(transport)
    console.log('test111',derivationPath);
    console.log('testapp',provenanceApp);
    // const hdPathArray = getHdDerivationPath(derivationPath)
    // await hash_token.getPublicKey("44'/505'/0'/0/0")
    const resp = await provenanceApp.getPublicKey(derivationPath)
    console.log('test222',resp);
    // if (!resp?.compressed_pk) {
    //   const appInfo = await cosmosApp.appInfo()
    //   await transport.close()
    //   ledgerErrorHandler({ appInfo, resp, rightApp: this.ledger})
    // }
    // // TODO cahnge to cosmosApp.getBech32FromPK
    const address = await getBech32FromPK(
      this.netPrefix,
      Buffer.from(resp.publicKey)
    )
    console.log('test333', address);
    console.log('test444', Buffer.from(resp.address).toString());

    // await transport.close()

    return {
      net: this.net,
      address,
      publicKey: Buffer.from(resp.publicKey).toString('hex'),
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      isCosmosNetwork: true,
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
  }
}
