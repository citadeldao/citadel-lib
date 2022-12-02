import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
import { checkDelegationTypes } from '../../helpers/checkArguments'
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
import { debugConsole } from '../../helpers/debugConsole'
import {getLedgerTransport} from "../../ledgerTransportProvider";

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
      return Promise.all(transaction.map((tx) => signTxByPrivateKey(tx, privateKey)))
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
    nodeAddresses,
    amount,
    type = DELEGATION_TYPES.STAKE,
    redelegateNodeAddresses,
    isWithoutDelegation,
  }) {
    checkDelegationTypes(type)
    const nodeAddress = nodeAddresses[0]
    const redelegateNodeAddress = redelegateNodeAddresses?.[0]

    if (isWithoutDelegation) {
      if (type === DELEGATION_TYPES.STAKE) {
        const { data } = await api.requests.prepareStakeWithoutDelegation({
          address: this.address,
          net: this.net,
          amount,
        })
        return data
      }
      if (type === DELEGATION_TYPES.UNSTAKE) {
        const { data } = await api.requests.prepareUnstakeWithoutDelegation({
          address: this.address,
          net: this.net,
          amount,
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
        amount,
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
            ? amount
            : // ustake
              0,
      })
    } else {
      //  if nodeAddress already staked, sum it value with amount
      alreadyStakedNode.value =
        type === DELEGATION_TYPES.STAKE
          ? // plus for stake
            BigNumber(alreadyStakedNode.value).plus(amount).toNumber()
          : // minus for stake
            BigNumber(alreadyStakedNode.value).minus(amount).toNumber()
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
    oneSeed = true,
  }) {
    // dynamic import of large module (for fast init)
    const { mnemonicToSeed } = await import('bip39')
    const { default: hdkey } = await import('hdkey')
    // generate address, public and private keys
    const seed = await mnemonicToSeed(mnemonic, passphrase)

    const master = hdkey.fromMasterSeed(seed)
    const keyPair = master.derive(derivationPath)
    const privateKey = Buffer.from(keyPair.privateKey)
    const { pubKey, address } = await fromPrivateKey(privateKey.toString('hex'))
    const publicKeyHex = Buffer.from(pubKey).toString('hex')
    return {
      net: this.net,
      address,
      publicKey: publicKeyHex,
      derivationPath,
      privateKey: privateKey.toString('hex'),
      type: oneSeed ? WALLET_TYPES.ONE_SEED : WALLET_TYPES.SEED_PHRASE,
      // update network info
      code: this.code,
      methods: this.methods,
      networkName: this.networkName,
      // add optional properties
      ...(this.fee_key && { fee_key: this.fee_key }),
      ...(this.bridges && { bridges: this.bridges }),
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(mnemonic),
      }),
    }
  }

  static async createWalletByPrivateKey({ privateKey }) {
    // generate address and public key
    try {
      const { pubKey, address } = await fromPrivateKey(privateKey)
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
        // additional fields for chrome extension
        ...(state.getState('isExtension') && {
          hashedMnemonic: hashMnemonic(),
        }),
      }
    } catch (error) {
      debugConsole.error(error)
      errors.throwError('WrongArguments', { message: 'Invalid Private Key' })
    }
  }

  static async createWalletByLedger({ derivationPath }) {
    // add global icon ledger app to avoid ledger reconnect error
    if (!global.ledger_icon) {
      const transport = await getLedgerTransport()
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
      // additional fields for chrome extension
      ...(state.getState('isExtension') && {
        hashedMnemonic: hashMnemonic(),
      }),
    }
  }
}
