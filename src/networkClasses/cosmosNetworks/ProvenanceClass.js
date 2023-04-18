import { BaseCosmosNetwork } from './_BaseCosmosClass'
import { getLedgerTransport } from "../../ledgerTransportProvider";
// import { ledgerErrorHandler } from "./_BaseCosmosClass/functions"
// import { getHdDerivationPath, getBech32FromPK } from '../_functions/ledger'
import { WALLET_TYPES } from '../../constants'
import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'

export class ProvenanceNetwork extends BaseCosmosNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  static async createWalletByLedger({ derivationPath }) {
    
    const transport = await getLedgerTransport()
    const { default: ProvenanceApp } = await import('@citadeldao/hw-app-hash')
    const provenanceApp = new ProvenanceApp(transport)
    console.log('test222',derivationPath);
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
    // const address = await getBech32FromPK(
    //   this.netPrefix,
    //   Buffer.from(resp.compressed_pk.buffer)
    // )
    // await transport.close()

    return {
      net: this.net,
      // address,
      publicKey: resp.compressed_pk.toString('hex'),
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
