import { BaseCosmosNetwork } from './_BaseCosmosClass'
import { getLedgerTransport } from "../../ledgerTransportProvider";
// import { ledgerErrorHandler } from "./_BaseCosmosClass/functions"
import { /*getHdDerivationPath,*/ getBech32FromPK} from '../_functions/ledger'
import {/* CACHE_NAMES, */ WALLET_TYPES} from '../../constants'
import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
/* import storage from "../../storage"; */
import {
  signJsonByPrivateKey,
  signTxByPrivateKey
} from "./_BaseCosmosClass/signers";
import {
  signTxByPrivateKey as altSignTxByPrivateKey
} from "./_BaseCosmosClass/oldSigners";
// import { ledgerErrorHandler } from "./_BaseCosmosClass/functions";

export class ProvenanceNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://ping.pub/provenance/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://ping.pub/provenance/tx/${hash}`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath, useAlternativeSigner, transportType }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      // const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger
      const { default: ProvenanceApp } = await import('@citadeldao/hw-app-hash')
      const transport = await getLedgerTransport(transportType)
      const provenanceApp = new ProvenanceApp(transport)
  
      // make stapshot of deafult tx
      const txSnapshot = JSON.parse(JSON.stringify(transaction))
      // remove granter kay from tx
      if(transaction.json?.fee?.granter) delete transaction.json.fee.granter;

      const resp = await provenanceApp.signTransaction(
          derivationPath,
          Buffer.from(transaction.bytes)
      )
      if(transportType === 'usb'){
        await transport.close()
      }
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
     
      const signedTx = {
        ...signMessage,
        // get default tx fee key
        fee: txSnapshot.json.fee,
        signature: signatureParsed,
        publicKey: this.publicKey,
        memo: transaction.json.memo,
        signType: 'direct',
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

  static async createWalletByLedger({ derivationPath, transportType }) {
    
    const transport = await getLedgerTransport(transportType)
    const { default: ProvenanceApp } = await import('@citadeldao/hw-app-hash')
    const provenanceApp = new ProvenanceApp(transport)
    const resp = await provenanceApp.getPublicKey(derivationPath)
    
    const address = await getBech32FromPK(
      this.netPrefix,
      Buffer.from(resp.publicKey)
    )
    if(transportType === 'usb'){
      await transport.close()
    }

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
