import api from '../../../../api'

export default async function(title) {
  await api.requests.renameWalletTitle({
    net: this.net,
    address: this.address,
    title: title,
  })
}
