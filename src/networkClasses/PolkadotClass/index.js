import state from '../../state'
import { hashMnemonic } from '../../helpers/hashMnemonic'
import { BaseNetwork } from '../_BaseNetworkClass'
import { checkDelegationTypes } from '../../helpers/checkArguments'
import { signTxByLedger } from './signers/signTxByLedger'
import { signTxByPrivateKeyOrMnemonic } from './signers/signTxByPrivateKeyOrMnemonic'
import api from '../../api'
import errors from '../../errors'
import PolkadotLedger from '@ledgerhq/hw-app-polkadot'
import { DELEGATION_TYPES, WALLET_TYPES, CACHE_NAMES } from '../../constants'
import { getLedgerTransport } from "../../ledgerTransportProvider";
import { ledgerErrorHandler } from "./signers/functions"
import storage from '../../storage'

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
    { privateKey, mnemonic, derivationPath, transportType }
  ) {
    // dynamic import of large module (for fast init)
    const { cryptoWaitReady } = await import('@polkadot/util-crypto')
    // init polkadot
    await cryptoWaitReady()
    // get transaction object
    const transaction =
      (!rawTransaction.metadata && rawTransaction.transaction) || rawTransaction
    // ledger signer
    if (this.type === WALLET_TYPES.LEDGER) {
      //rigth app for ledger
      const rightApp = storage.caches.getCache(CACHE_NAMES.NETWORKS_CONFIG)[this.net].ledger

      return await signTxByLedger(transaction, derivationPath, this.address, rightApp, transportType)
    }
    // mnemonic / privateKey signer (mnemonic can be used as private key fot sign)
    return signTxByPrivateKeyOrMnemonic(
      transaction,
      privateKey || mnemonic,
      derivationPath
    )
  }

  async prepareDelegation({
    nodeAddresses,
    amount,
    type = DELEGATION_TYPES.STAKE,
    redelegateNodeAddresses,
    additionalFee = 0,
    rewardsAddress,
    rewardsRestake,
  }) {
    checkDelegationTypes(type)

    if (type === DELEGATION_TYPES.STAKE) {
      const { data } = await api.requests.polkadotPrepareStakeAndNominate({
        address: this.address,
        delegations: nodeAddresses,
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
        delegations: redelegateNodeAddresses,
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

  async signAndSend(rawTransaction, { privateKey, mnemonic, derivationPath, transportType }) {
    // sign transaction
    const signedTransaction = await this.signTransaction(rawTransaction, {
      privateKey,
      mnemonic,
      derivationPath,
      transportType
    })
    // send transaction by special api
    const { data } = await api.requests.polkadotSignAndSend({
      ...signedTransaction,
      mem_tx_id: rawTransaction?.mem_tx_id,
    })
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

  static async createWalletByMnemonic({
    mnemonic,
    derivationPath,
    oneSeed = true,
  }) {
    // dynamic import of large module (for fast init)
    const { cryptoWaitReady } = await import('@polkadot/util-crypto')
    // init polkadot
    await cryptoWaitReady()
    // dynamic import of large module (for fast init)
    const { Keyring } = await import('@polkadot/api')
    // generate address and publicKey
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 })
    const { address, publicKey } = await keyring.addFromUri(
      mnemonic + derivationPath || ''
    )
    // account = await keyring.addFromMnemonic((mnemonic + derivationPath) || '');

    return {
      net: this.net,
      address,
      publicKey: Buffer.from(publicKey).toString('hex'),
      derivationPath,
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
    // dynamic import of large module (for fast init)
    const { cryptoWaitReady } = await import('@polkadot/util-crypto')
    // init polkadot
    await cryptoWaitReady()
    // dynamic import of large module (for fast init)
    const { Keyring } = await import('@polkadot/api')
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

  static async createWalletByLedger({ derivationPath, transportType }) {
    // dynamic import of large module (for fast init)
    const { cryptoWaitReady } = await import('@polkadot/util-crypto')
    // init polkadot
    await cryptoWaitReady()
    // add global ledger app to avoid ledger reconnect error
    let transport
    if (!global.ledger_polkadot) {
      transport = await getLedgerTransport(transportType)
      global.ledger_polkadot = new PolkadotLedger(transport)
    }
    // generate address and public key
    let res
    try{
      res = await global.ledger_polkadot.getAddress(derivationPath)
    }catch(error){
      ledgerErrorHandler({ error, rightApp: this.ledger})
    }finally{
      if(transportType === 'usb'){
        if(global.ledger_polkadot) global.ledger_polkadot = null
        if(transport) await transport.close()
      }
    }

    return {
      net: this.net,
      address: res.address,
      publicKey: res.pubKey,
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
