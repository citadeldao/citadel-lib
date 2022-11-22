import { BaseEthNetwork } from './_BaseEthClass'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { WALLET_TYPES } from '../../constants'
import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'

export class EvmosethNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://evm.evmos.org/address/${this.address}/transactions`
  }

  getTransactionURLByHash(hash) {
    return `https://evm.evmos.org/tx/${hash}`
  }


  static async createWalletByLedger({ derivationPath }) {
    // dynamic import of large module (for fast init)
    const { default: EthApp } = await import('@ledgerhq/hw-app-eth')

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