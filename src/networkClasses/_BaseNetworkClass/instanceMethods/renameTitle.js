import api from '../../../api'

// proxy request to backend
export const renameTitle = async function (title) {
  await api.requests.renameWalletTitle({
    net: this.net,
    address: this.address,
    title: title,
  })
}
