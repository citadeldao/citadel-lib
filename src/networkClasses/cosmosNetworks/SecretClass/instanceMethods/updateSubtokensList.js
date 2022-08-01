import { updateSubtokensList as baseUpdateSubtokensList } from '../../../_BaseNetworkClass/instanceMethods/updateSubtokensList'

export async function updateSubtokensList() {
  // save snip20 tokens before update ICS20
  const savedSnip20List = this.subtokensList.filter(
    ({ standard }) => standard === 'snip20'
  )

  // ICS20 update
  // instead "super"
  await baseUpdateSubtokensList.call(this, savedSnip20List)

  // SNIP20 update (do not await by default), but dispatch event walletListUpdated
  this.updateSnip20SubtokensList()
}
