import errors from '../../../../errors'
import { VIEWING_KEYS_TYPES } from '../../../../constants'
import networks from '../../..'

export default async function ({ token, page = 1, pageSize = 10 }) {
  const networkClass = networks.getNetworkClass(this.net)
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
      // clear not valid vk
      this._saveViewingKeyToInstance(token, null)
      await this._saveViewingKeysToStorage()
      // throw error if vk was simple
      viewingKeyType === VIEWING_KEYS_TYPES.SIMPLE &&
        errors.throwError('ViewingKeyError')
    } else {
      // set raw transaction list
      rawTransactionsList = list
    }
  }

  // has no saved VK
  if (!rawTransactionsList) {
    // try simple viewingKey
    const simpleViewingKey = snip20Manager.generateSimpleViewingKey(
      networkClass.tokens[token].address
    )
    const { error, list } = await snip20Manager.getTokenTransactions({
      address: this.address,
      contractAddress: networkClass.tokens[token].address,
      viewingKey,
      page: 0,
      pageSize: 200,
    })
    // if simple vk is not valid (error), throw error
    error && errors.throwError('ViewingKeyError')

    // if simple vk is valid save it to instance and storage
    this._saveViewingKeyToInstance(
      token,
      simpleViewingKey,
      VIEWING_KEYS_TYPES.SIMPLE
    )
    await this._saveViewingKeysToStorage()

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
