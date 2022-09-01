import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import networkClasses from '../../../'
import { calculateSubtokenBalanceUSD } from '../../../_functions/balances'
import walletsManager from '../../../../walletsManager'
import { WALLET_TYPES } from '../../../../constants'

export async function transactions_scrt({ token, page = 1, pageSize = 10 }) {
  const networkClass = networkClasses.getNetworkClass(this.net)
  const snip20Manager = networkClass.getSnip20Manager()

  let rawTransactionsList
  // check saved viewingKey
  const { viewingKey, viewingKeyType } = this.savedViewingKeys[token] || {}

  // get 200 transactions to correct remove duplicate transactions from list

  // has saved vk
  if (viewingKey) {
    const { error, list } = await snip20Manager.getTokenTransactions({
      address: this.address,
      contractAddress: networkClass.tokens[token].address,
      viewingKey,
      page: 0,
      pageSize: 200,
    })

    if (error) {
      // VK is not valid
      // delete saved VK
      delete this.savedViewingKeys[token]
      // delete subtokenItem
      const subtokensListItemIndex = this.subtokensList.findIndex(
        (tokenItem) => tokenItem.net === token
      )
      subtokensListItemIndex > -1 &&
        this.subtokensList.splice(subtokensListItemIndex, 1)
      // update subtokenBalance
      this.subtokenBalanceUSD = calculateSubtokenBalanceUSD(this.subtokensList)
      // update wallet
      walletsManager.updateWallet({
        walletId: this.id,
        newWalletInfo: {
          subtokensList: this.subtokensList,
          subtokenBalanceUSD: this.subtokenBalanceUSD,
          savedViewingKeys: this.savedViewingKeys,
        },
      })

      // throw error if vk was simple
      viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE &&
        this.type !== WALLET_TYPES.KEPLR &&
        errors.throwError('ViewingKeyError')
    } else {
      // set raw transaction list
      rawTransactionsList = list
    }
  }
  // has no valid saved VK
  if (!rawTransactionsList) {
    // try simple or keplr VK
    const { viewingKey, error: getVKError } =
      await this.getPossibleViewingKeyForCheck(token)

    // throw 'change account' keplr error
    if (getVKError?.code === 1 && this.type === WALLET_TYPES.KEPLR) {
      throw getVKError
    }
    // if no vk throw standard error
    !viewingKey && errors.throwError('ViewingKeyError')

    const { error, list } = await snip20Manager.getTokenTransactions({
      address: this.address,
      contractAddress: networkClass.tokens[token].address,
      viewingKey,
      page: 0,
      pageSize: 200,
    })
    // if generated vk is not valid (error), throw error
    error && errors.throwError('ViewingKeyError')

    rawTransactionsList = list
  }

  // remove duplicate transactions
  const filteredList = rawTransactionsList.filter(
    ({ id }, index) =>
      rawTransactionsList.findIndex((tx) => tx.id === id) === index
  )

  // format list
  const formattedList = filteredList.map(
    ({ from, receiver, id, coins: { amount } }) => {
      let direction
      let value = amount / 10 ** networkClass.tokens[token].decimals

      // add transaction types

      // income transfer
      if (from !== this.address) {
        direction = 'income'
        value = +value
      }

      // self send
      if (from === this.address && from === receiver) {
        direction = 'transfer'
        value = +value
      }

      // outcome send
      if (from === this.address && from !== receiver) {
        direction = 'outcome'
        value = -value
      }

      return { from, to: receiver, id, type: 'transfer', direction, value }
    }
  )

  return {
    list: formattedList.slice((page - 1) * pageSize, page * pageSize),
    count: formattedList.length,
  }
}
