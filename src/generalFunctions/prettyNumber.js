import BigNumber from 'bignumber.js'

const cutNumber = (number, digits = 0) =>
  Math.floor(
    BigNumber(number)
      .multipliedBy(10 ** digits)
      .toNumber()
  ) /
  10 ** digits

const classesAbb = {
  0: '',
  3: 'K',
  6: 'M',
  9: 'B',
  12: 'T',
  15: 'q',
  18: 'Q',
}

export const prettyNumber = (value) => {
  if (!value) {
    return '0'
  }

  // for string with range (iost APY "4.8-36.13" etc)
  if (Number.isNaN(+value)) {
    return value
  }

  const formatedValue = value.toString().trim().replace(/,/g, '')

  const abbDecimals = 2
  const maxDecimals = 5
  const prefix = +formatedValue < 0 ? '-' : ''
  const absoluteValue = Math.abs(formatedValue)
  const intPart = Math.floor(absoluteValue)
  const valueRank = intPart === 0 ? 0 : intPart.toString().length

  // |value| > 1
  if (valueRank > 0) {
    const classes = Object.keys(classesAbb).sort((a, b) => b - a)
    const valueClass = classes.find((i) => valueRank > i)

    return `${prefix}${cutNumber(
      absoluteValue / 10 ** valueClass,
      abbDecimals
    )}${classesAbb[valueClass]}`
  }

  // |value| < 1
  if (absoluteValue && cutNumber(absoluteValue, maxDecimals) === 0) {
    return '~0'
  }

  return `${prefix}${cutNumber(absoluteValue, maxDecimals)}`
}
