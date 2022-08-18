import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
import { BaseNetwork } from '../_BaseNetworkClass'
import { checkDelegationTypes } from '../../helpers/checkArguments'
import { signTxByLedger } from './signers/signTxByLedger'
import { signTxByPrivateKeyOrMnemonic } from './signers/signTxByPrivateKeyOrMnemonic'
import api from '../../api'
import errors from '../../errors'
import { Keyring } from '@polkadot/api'
import PolkadotLedger from '@ledgerhq/hw-app-polkadot'
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import U2fTransport from '@ledgerhq/hw-transport-u2f'
import { DELEGATION_TYPES, WALLET_TYPES } from '../../constants'
import { cryptoWaitReady } from '@polkadot/util-crypto'
// init polkadot
cryptoWaitReady()

export class PolkadotNetwork extends BaseNetwork {
  constructor(walletInfo) {
    super(walletInfo)
  }

  getScannerLinkById() {
    return `https://polkadot.subscan.io/account/${this.address}`
  }

  getTransactionURLByHash(hash) {
    return `https://polkadot.subscan.io/extrinsic/${hash}`
  }

  async getStakeList() {
    const { data } = await api.requests.polkadotListOfValidators({
      address: this.address,
    })

    return data.validators.map((address) => ({
      staked: true,
      current: address,
    }))
  }

  async signTransaction(
    rawTransaction,
    { privateKey, mnemonic, derivationPath }
  ) {
    // get transaction object
    const transaction =
      (!rawTransaction.metadata && rawTransaction.transaction) || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      return await signTxByLedger(transaction, derivationPath, this.address)
    }
    // mnemonic / privateKey signer (mnemonic can be used as private key fot sign)
    return signTxByPrivateKeyOrMnemonic(transaction, privateKey || mnemonic)
  }

  async prepareDelegation({
    nodeAddress,
    amount,
    type = DELEGATION_TYPES.STAKE,
    redelegateNodeAddress,
    additionalFee = 0,
    rewardsAddress,
    rewardsRestake,
  }) {
    checkDelegationTypes(type)

    if (type === DELEGATION_TYPES.STAKE) {
      const { data } = await api.requests.polkadotPrepareStakeAndNominate({
        address: this.address,
        delegations: nodeAddress.map(({ address }) => address),
        // amount: >= 120
        amount,
        tip: additionalFee,
        rewardsAddress,
        rewardsRestake,
      })

      return data
    }

    if (type === DELEGATION_TYPES.UNSTAKE) {
      const { data } = await api.requests.polkadotPrepareUnstake({
        address: this.address,
        amount,
        tip: additionalFee,
      })

      return data
    }

    if (type === DELEGATION_TYPES.REDELEGATE) {
      const { data } = await api.requests.polkadotPrepareRedelegation({
        address: this.address,
        // адреса на которые ределигируется
        delegations: redelegateNodeAddress.map(({ address }) => address),
        tip: additionalFee,
      })

      return data
    }
  }

  async prepareClaim() {
    const { data } = await api.requests.prepareClaim({
      net: this.net,
      address: this.address,
    })

    return data
  }

  async prepareClaimUnstaked() {
    const { data } = await api.requests.polkadotPrepareClaimUnstaked({
      address: this.address,
    })

    if (this.balance.mainBalance < data?.fee) {
      errors.throwError('RequestError', { message: 'Insufficient funds' })
    }

    return data
  }

  async signAndSend(rawTransaction, { privateKey, mnemonic, derivationPath }) {
    // sign transaction
    const signedTransaction = await this.signTransaction(rawTransaction, {
      privateKey,
      mnemonic,
      derivationPath,
    })
    // send transaction by special api
    const { data } = await api.requests.polkadotSignAndSend(signedTransaction)
    // return hash
    return [data.hash || data.txhash || data]
  }

  static getDerivationPathByIndex(type = 'seed', index = 0) {
    // for 'seed' expected order of paths: '', //joe//polkadot//0, //joe//polkadot//1 ...
    if (type === 'seed') {
      // for zero index - empty string
      if (+index === 0) {
        return ''
      }
      // for not zero index return template with index reduced by one
      index--
    }

    return super.getDerivationPathByIndex(type, index)
  }

  static async createWalletByMnemonic({ mnemonic, derivationPath }) {
    // generate address and publicKey
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 })
    const { address, publicKey } = await keyring.addFromUri(
      mnemonic + derivationPath || ''
    )
    // account = await keyring.addFromMnemonic((mnemonic + derivationPath) || '');

    return {
      net: this.net,
      address,
      // for polka return mnemonic
      mnemonic,
      publicKey: Buffer.from(publicKey).toString('hex'),
      derivationPath,
      type: WALLET_TYPES.ONE_SEED,
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
    // generate address and publicKey
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 })
    const { address, publicKey } = keyring.addFromUri(privateKey)

    return {
      net: this.net,
      address,
      privateKey,
      publicKey: Buffer.from(publicKey).toString('hex'),
      type: WALLET_TYPES.PRIVATE_KEY,
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

  static async createWalletByLedger({ derivationPath }) {
    // add global ledger app to avoid ledger reconnect error
    if (!global.ledger_polkadot) {
      const transport = (await WebHidTransport.isSupported())
        ? await WebHidTransport.create(10000)
        : await U2fTransport.create(10000)
      global.ledger_polkadot = new PolkadotLedger(transport)
    }
    // generate address and public key
    const { pubKey: publicKey, address } =
      await global.ledger_polkadot.getAddress(derivationPath)

    return {
      net: this.net,
      address,
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
