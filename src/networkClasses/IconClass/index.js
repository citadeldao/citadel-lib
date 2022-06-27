import { checkDelegationTypes } from '../../helpers/checkArguments'
import hdkey from 'hdkey'
import { sha3_256 } from 'js-sha3'
import { mnemonicToSeed } from 'bip39'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import BigNumber from 'bignumber.js'
import api from '../../api'
import { WALLET_TYPES, DELEGATION_TYPES } from '../../constants'
import errors from '../../errors'
import { BaseNetwork } from '../_BaseNetworkClass'
import { fromPrivateKey } from './functions/fromPrivateKey'
import {
  signTxByPrivateKey,
  createMessageSignature,
  signTxByLedger,
} from './signers'
import { IconApp } from './ledgerApp'

export class IconNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://tracker.icon.foundation/address/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://tracker.icon.foundation/transaction/${hash}`
  }

  async signTransaction(rawTransaction, { privateKey, derivationPath }) {
    // get transaction object
    const transaction = rawTransaction.transaction || rawTransaction
    if (this.type === WALLET_TYPES.LEDGER) {
      if (Array.isArray(transaction)) {
        // sign sequentially all transactions before send
        const signedTransactions = []
        for (const transactionItem of transaction) {
          const signedTx = await signTxByLedger(transactionItem, derivationPath)
          signedTransactions.push(signedTx)
        }
        return signedTransactions
      } else {
        return await signTxByLedger(transaction, derivationPath)
      }
    }

    // sign all transactions before send
    if (Array.isArray(transaction)) {
      return transaction.map((tx) => signTxByPrivateKey(tx, privateKey))
    } else {
      return signTxByPrivateKey(transaction, privateKey)
    }
  }

  createMessageSignature(data, { privateKey, derivationPath }) {
    return createMessageSignature(data, {
      privateKey,
      derivationPath,
      type: this.type,
    })
  }

  async prepareDelegation({
    nodeAddress,
    amount,
    type = DELEGATION_TYPES.STAKE,
    redelegateNodeAddress,
    isWithoutDelegation,
  }) {
    checkDelegationTypes(type)
    if (isWithoutDelegation) {
      if (type === DELEGATION_TYPES.STAKE) {
        const { data } = await api.requests.prepareStakeWithoutDelegation({
          address: this.address,
          net: this.net,
          amount: Math.abs(amount),
        })
        return data
      }
      if (type === DELEGATION_TYPES.UNSTAKE) {
        const { data } = await api.requests.prepareUnstakeWithoutDelegation({
          address: this.address,
          net: this.net,
          amount: Math.abs(amount),
        })
        return data
      }
    }
    if (type === DELEGATION_TYPES.REDELEGATE) {
      const { data } = await api.requests.prepareRedelegation({
        address: this.address,
        net: this.net,
        from: nodeAddress,
        to: redelegateNodeAddress,
        amount: Math.abs(amount),
      })
      return data
    }

    // stake and unstake: calc absolute node amounts
    // get current stakeList
    const stakeList = await this.getStakeList()
    // format it
    const preparedStakeList = stakeList.map(({ current: address, value }) => ({
      address,
      value,
    }))
    // find nodeAddress among staked nodes
    const alreadyStakedNode = preparedStakeList.find(
      ({ address }) => nodeAddress === address
    )

    if (!alreadyStakedNode) {
      // if nodeAddress not staked before, push it to prepared stakeList with amount (for stake) or 0 for unstake (?)
      preparedStakeList.push({
        address: nodeAddress,
        value:
          type === DELEGATION_TYPES.STAKE
            ? Math.abs(amount)
            : // ustake
              0,
      })
    } else {
      //  if nodeAddress already staked, sum it value with amount
      alreadyStakedNode.value =
        type === DELEGATION_TYPES.STAKE
          ? // plus for stake
            BigNumber(alreadyStakedNode.value).plus(Math.abs(amount)).toNumber()
          : // minus for stake
            BigNumber(alreadyStakedNode.value)
              .minus(Math.abs(amount))
              .toNumber()
    }

    // send preparedStakeList with values
    const { data } = await api.requests.prepareDelegations({
      from: this.address,
      net: this.net,
      delegations: preparedStakeList,
      publicKey: this.publicKey,
    })

    return data
  }

  async prepareClaim() {
    const { data } = await api.requests.prepareClaim({
      net: this.net,
      address: this.address,
    })

    return data
  }

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    passphrase = '',
  }) {
    // generate address, public and private keys
    const seed = await mnemonicToSeed(mnemonic, passphrase)
    const master = hdkey.fromMasterSeed(seed)
    const keyPair = master.derive(derivationPath)
    const privateKey = Buffer.from(keyPair.privateKey)
    const { pubKey } = fromPrivateKey(privateKey.toString('hex'))
    const address = 'hx' + sha3_256(pubKey.slice(1)).slice(-40)
    const publicKeyHex = Buffer.from(pubKey).toString('hex')
    return {
      net: this.net,
      address,
      publicKey: publicKeyHex,
      derivationPath,
      privateKey: privateKey.toString('hex'),
      type: WALLET_TYPES.ONE_SEED,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    // generate address and public key
    try {
      const pubKey = fromPrivateKey(privateKey).pubKey
      const address = 'hx' + sha3_256(pubKey.slice(1)).slice(-40)
      const publicKey = Buffer.from(pubKey).toString('hex')

      return {
        net: this.net,
        address,
        publicKey,
        privateKey,
        derivationPath: null,
        type: WALLET_TYPES.PRIVATE_KEY,
        // update network info
        code: this.code,
        methods: this.methods,
        networkName: this.networkName,
        // add optional properties from networks.json
        ...(this.fee_key && { fee_key: this.fee_key }),
        ...(this.bridges && { bridges: this.bridges }),
      }
    } catch (error) {
      console.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
  }

  static async createWalletByLedger({ derivationPath }) {
    // add global icon ledger app to avoid ledger reconnect error
    if (!global.ledger_icon) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
      global.ledger_icon = new IconApp(transport)
    }
    // generate address and public key
    const { publicKey, address } = await global.ledger_icon.getAddress(
      derivationPath
    )

    return {
      net: this.net,
      address: address.toString(),
      publicKey,
      privateKey: null,
      derivationPath,
      type: WALLET_TYPES.LEDGER,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
    }
  }
}
