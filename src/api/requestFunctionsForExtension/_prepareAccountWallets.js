import { getType } from '../../helpers/checkArguments'

export const prepareAccountWallets = async () => {
  // eslint-disable-next-line
  let chromeStorage = chrome?.storage?.local

  // mock chromeStorage for manual testing on web test UI
  if (!chromeStorage) {
    chromeStorage = {
      get() {
        return { allWallets: localStorage.getItem('allWallets') }
      },
    }
  }

  const { allWallets } = await chromeStorage.get(['allWallets'])

  // parse JSON
  const rawWallets = JSON.parse(JSON.parse(allWallets)) || []

  const wallets = []

  // format wallet keys
  rawWallets.map(({ wallets: walletsGroup }) => {
    walletsGroup.map(
      ({
        address,
        code,
        customName: title,
        id = null,
        net,
        balance = 0,
      }) => {
        // balance was originally a number
        if (getType(balance) === 'Number') {
          // convert to standard lib format
          balance = {
            mainBalance: balance,
            calculatedBalance: balance,
          }
        }
        wallets.push({
          address,
          code,
          title: title || '',
          id,
          net,
          balance,
        })
      }
    )
  })

  // add missing id's
  const generateWalletId = () => {
    const idsArray = wallets.map(({ id }) => +id).filter((id) => id)
    if (!idsArray.length) {
      return 1
    }
    return Math.max(...idsArray) + 1
  }

  wallets.map((wallet) => {
    if (!wallet.id) {
      wallet.id = generateWalletId()
    }
  })

  return wallets
}
