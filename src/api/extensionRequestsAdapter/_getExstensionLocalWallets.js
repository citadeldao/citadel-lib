import { getType } from '../../helpers/checkArguments'

export const getExstensionLocalWallets = async () => {
  // eslint-disable-next-line
  let chromeStorage = chrome?.storage?.local

  // mock chromeStorage for manual testing on web test UI
  if (!chromeStorage) {
    chromeStorage = {
      get([key]) {
        return {
          allWallets: JSON.parse(JSON.parse(localStorage.getItem(key))),
        }
      },
    }
  }

  const { allWallets: rawWallets = [] } = await chromeStorage.get([
    'allWallets',
  ])

  const wallets = []

  // format wallet keys
  JSON.parse(rawWallets).map(({ hashedMnemonic, wallets: walletsGroup }) => {
    walletsGroup.map(
      ({
        address,
        code,
        customName: title,
        id = null,
        net,
        balance = 0,
        publicKey,
        type,
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
          // local wallet data
          hashedMnemonic,
          publicKey,
          type,
        })
      }
    )
  })

  // add missing id's
  const generateWalletId = () => {
    const idsArray = wallets.map(({ id }) => +id).filter((id) => id)
    if (!idsArray.length) {
      return '1'
    }
    return `${Math.max(...idsArray) + 1}`
  }

  wallets.map((wallet) => {
    if (!wallet.id) {
      wallet.id = generateWalletId()
    }
  })

  return wallets
}
