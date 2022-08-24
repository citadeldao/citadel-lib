import { BaseEthNetwork } from './_BaseEthClass'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import EthApp from '@ledgerhq/hw-app-eth'
import { WALLET_TYPES } from '../../constants'
import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'

export class PolygonNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://etherscan.io/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://etherscan.io/tx/${hash}`
  }

  static async createWalletByLedger({ derivationPath }) {
    console.log(111,global);
    // add global ledger app to avoid ledger reconnect error
    if (!global.ledger_eth && !global.ledger_bsc) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
      global.ledger_eth = new EthApp(transport)
    }
    // generate address and public key
    const { publicKey, address } = await (
      global.ledger_eth || global.ledger_bsc
    ).getAddress(derivationPath)

    return {
      net: this.net,
      address: address.toString().toLowerCase(),
      publicKey,
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
}


//435216
// {
//     "from": "0x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2",
//     "to": "0x4dd28bee5135fc5dbb358a68ba941a5bf8e7aab2",
//     "value": "0xde0b6b3a7640000",
//     "gas": 27300,
//     "nonce": 7,
//     "gasPrice": "46000000000",
//     "chainId": 137
// }
// m/44'/60'/0'/0/0

// 0x499c4074a0f0382de9c01805ba1a07872d574e4b9521c42a703c1ac9fa841555

