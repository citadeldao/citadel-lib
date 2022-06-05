import BaseEthNetwork from './_BaseEthClass'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import EthApp from '@ledgerhq/hw-app-eth'
import { WALLET_TYPES } from '../../../constants'

export default class EthNetwork extends BaseEthNetwork {
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
    if (!global.ledger_eth && !global.ledger_bsc) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
      global.ledger_eth = new EthApp(transport)
    }

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
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }
}
