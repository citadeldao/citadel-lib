import api from '../api'
import storage from '../storage'
import errors from '../errors'
import state from '../state'
import networks from '../networks'
import { calculateSubtokenBalanceUSD } from '../networks/networkClasses/_functions/balances'
// TODO: убрать публичные экшены отсюда
import publicActions from '../publicActions'
import BigNumber from 'bignumber.js'

// TODO: split to files и вообще отрефакторить
export default async (eventName, socketObject) => {
  const supportedTokens = state.getState('supportedTokens')
  const supportedNetworkKeys = state.getState('supportedNetworkKeys')

  switch (eventName) {
    case 'address-balance-updated-client': {
      const { address, net, balance } = socketObject
      const isNativeToken = supportedNetworkKeys.includes(net)
      const nativeNet = networks.getNativeNet(net)
      const networkClass = networks.getNetworkClass(nativeNet)

      // TODO: временный костыль пока бэк не переименует
      balance.claimableRewards = balance?.rewards
      delete balance.rewards
      // get wallet id
      const storageWallet = storage.wallets.getWalletByAddress(
        nativeNet,
        address
      )

      // Если кошелька еще нет в либе, но сокеты приходят (с другой вкладки добавлен)
      if (!storageWallet) {
        return
      }

      // для нативного токена просто обновляем баланс
      if (isNativeToken) {
        // calcBalance
        balance.calculatedBalance = networks
          .getNetworkClass(nativeNet)
          .calculateBalance(balance)
        // update native balance
        storage.wallets.updateWallet({
          walletId: storageWallet.id,
          newWalletInfo: { balance },
          // deep merge for save not changed details
          method: 'deep-merge',
        })
        return {}
      }

      // для сабтокена меняем массив subtokenList в кошельке и обновляем его

      // get old token item
      let oldTokenItem = storageWallet.subtokensList.find(
        ({ net: token }) => net === token
      )

      // remove subtokenList item if new balance is 0
      if (oldTokenItem && balance.mainBalance === 0 && net !== 'bsc_xct') {
        const itemIndex = storageWallet.subtokensList.findIndex(
          ({ net: token }) => net === token
        )
        storageWallet.subtokensList.splice(itemIndex, 1)

        storage.wallets.updateWallet({
          walletId: storageWallet.id,
          newWalletInfo: {
            subtokensList: storageWallet.subtokensList,
            subtokenBalanceUSD: calculateSubtokenBalanceUSD(
              storageWallet.subtokensList
            ),
          },
        })
        return {}
      }

      // if no old token item
      if (!oldTokenItem) {
        // get token prcie
        let price = { USD: 0, BTC: 0 }
        try {
          const { data = { USD: 0, BTC: 0 } } = await api.requests.getCurrency({
            net,
          })
          price = data
        } catch (e) {
          console.error(e)
        }

        oldTokenItem = {
          code: networkClass.tokens[net].code,
          name: networkClass.tokens[net].name,
          net: networkClass.tokens[net].net,
          tokenBalance: {
            mainBalance: 0,
            calculatedBalance: 0,
            price,
            adding: [],
            delegatedBalance: 0,
            frozenBalance: 0,
            originatedAddresses: [],
            stake: 0,
            unstake: 0,
            linked: true,
            claimableRewards: 0,
          },
        }
        storageWallet.subtokensList.push(oldTokenItem)
      }

      // merge for save "price" key
      oldTokenItem.tokenBalance = { ...oldTokenItem.tokenBalance, ...balance }

      // calc token balance
      if (net === 'bsc_xct') {
        const { mainBalance = 0, stake = 0, frozenBalance = 0 } = balance
        oldTokenItem.tokenBalance.calculatedBalance = BigNumber(mainBalance)
          .plus(stake)
          .plus(frozenBalance)
          .toNumber()
      } else {
        oldTokenItem.tokenBalance.calculatedBalance =
          networkClass.calculateBalance(balance)
      }
      // update subtokensList
      storage.wallets.updateWallet({
        walletId: storageWallet.id,
        newWalletInfo: {
          subtokensList: storageWallet.subtokensList,
          subtokenBalanceUSD: calculateSubtokenBalanceUSD(
            storageWallet.subtokensList
          ),
        },
      })

      return {}
    }
    // убрать после того как будут корректные сокеты (оставить только)
    case 'mempool-remove-tx-client': {
      const { from, net, to, type } = socketObject
      const updateStakeListRequired = ['stake', 'unstake', 'restake'].includes(
        type
      )
      const isSubtoken = !supportedNetworkKeys.includes(net)
      const nativeNet = networks.getNativeNet(net)

      const fromWallet = storage.wallets.getWalletByAddress(nativeNet, from)

      const toWallet = storage.wallets.getWalletByAddress(nativeNet, to)
      // update nativeNet or token balance
      fromWallet && (await publicActions.getBalanceById(fromWallet.id, net))
      toWallet &&
        toWallet.address !== fromWallet?.address &&
        (await publicActions.getBalanceById(toWallet.id, net))
      // update native token for subtoken
      isSubtoken &&
        fromWallet &&
        (await publicActions.getBalanceById(
          fromWallet.id,
          supportedTokens[net]
        ))
      isSubtoken &&
        toWallet &&
        toWallet.address !== fromWallet?.address &&
        (await publicActions.getBalanceById(toWallet.id, supportedTokens[net]))

      return { updateStakeListRequired }
    }
    default:
      errors.throwError('LibraryError', {
        message: `Unknow eventName: "${eventName}"`,
      })
  }
}
