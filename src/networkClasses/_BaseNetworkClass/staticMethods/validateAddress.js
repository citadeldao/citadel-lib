// validate address by regExp string from networks.json
export const validateAddress = function (address) {
  const regExp = new RegExp(this.validating)
  return regExp.test(address)
}
