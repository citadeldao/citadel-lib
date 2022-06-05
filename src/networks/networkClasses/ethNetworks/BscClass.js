import BaseEthNetwork from './_BaseEthClass'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import EthApp from '@ledgerhq/hw-app-eth'
import { WALLET_TYPES } from '../../../constants'
import storage from '../../../storage'
import state from '../../../state'
import api from '../../../api'
import publicActions from '../../../publicActions'
import networks from '../..'

export default class BscNetwork extends BaseEthNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  async getUnassignedAddresses() {
    // TODO: убрать это из токен инфо и переместить в валлет лист методы
    // get added wallets
    const storageWalletList = storage.wallets.getWalletList()

    //get assigned addresses
    let { wallets: assignedAddresses = [] } = await this.callTokenInfo(
      'bsc_xct',
      'assignedAddresses'
    )

    // filter not supported wallets
    const supportedUserWallets = storageWalletList.filter(
      ({ net, type }) =>
        state.getState('supportedNetworkKeys').includes(net) &&
        state.getState('daoSupportedNetworks').includes(net) &&
        type !== WALLET_TYPES.PUBLIC_KEY
    )

    // remove assigned wallets and add code
    const unassignedWallets = supportedUserWallets.filter(
      ({ net, address }) => {
        return !assignedAddresses.find(
          ({ net: assignedNet, address: assignedAddress }) =>
            assignedNet === net && assignedAddress === address
        )
      }
    )

    // get unassigned wallets holders
    if (unassignedWallets.length) {
      const { data: unassignedWalletsHolders } =
        await api.requests.getDaoWallets({
          list: unassignedWallets.map(({ net, address }) => ({ net, address })),
        })

      // adding "assignedTo" key to wallets assigned to other addresses
      unassignedWalletsHolders.map(({ net, address, holder }) => {
        const unassignedWallet = unassignedWallets.find(
          (userWallet) =>
            userWallet.net === net && userWallet.address === address
        )
        if (unassignedWallet) {
          unassignedWallet.assignedTo = holder
        }
      })
    }

    return unassignedWallets
  }

  async getAssignedAddresses() {
    // TODO: убрать это из токен инфо и переместить в валлет лист методы
    // get added wallets
    const storageWalletList = storage.wallets.getWalletList()
    //get assigned addresses
    let { wallets: assignedAddresses = [] } = await this.callTokenInfo(
      'bsc_xct',
      'assignedAddresses'
    )

    // filter not supported wallets
    assignedAddresses = assignedAddresses.filter(({ net }) =>
      state.getState('supportedNetworkKeys').includes(net)
    )

    await Promise.all(
      assignedAddresses.map(async (assignedWallet) => {
        // add title
        const assignedUserWallet = storageWalletList.find(
          (userWallet) =>
            userWallet.net === assignedWallet.net &&
            userWallet.address === assignedWallet.address
        )
        assignedWallet.title = assignedUserWallet?.title || ''
        // add balance
        const { data: balance } = await publicActions.getBalanceByAddress(
          assignedWallet.net,
          assignedWallet.address
        )

        assignedWallet.balance = balance

        // add code from config
        assignedWallet.code = networks.getNetworkClass(assignedWallet.net).code
      })
    )
    return assignedAddresses
  }

  async getDaoRewardsByRange(dateFrom, dateTo) {
    const { data } = await api.requests.getDaoRewardsByRange({
      date_from: dateFrom,
      date_to: dateTo,
      address: this.address,
    })

    return data
  }

  async getDaoCalculatorData() {
    const { data } = await api.requests.getDaoCalculatorData({
      address: this.address,
    })

    return data
  }

  async getAllDaoRewards() {
    const { data } = await api.requests.getAllDaoRewards({
      address: this.address,
    })

    return data
  }

  getScannerLinkById() {
    return `https://bscscan.com/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://bscscan.com/tx/${hash}`
  }

  static async createWalletByLedger({ derivationPath }) {
    if (!global.ledger_bsc && !global.ledger_eth) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
      global.ledger_bsc = new EthApp(transport)
    }

    const { publicKey, address } = await (
      global.ledger_bsc || global.ledger_eth
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
