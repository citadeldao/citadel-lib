import { mergeWith } from 'lodash'

export const merge = (oldValue, newValue) => {
  const customizer = (objValue, srcValue) => {
    // replace arrays
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      return srcValue
    }
  }
  mergeWith(oldValue, newValue, customizer)
}
