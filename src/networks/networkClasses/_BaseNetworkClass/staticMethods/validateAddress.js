export default function(address) {
  const regExp = new RegExp(this.validating)
  return regExp.test(address)
}