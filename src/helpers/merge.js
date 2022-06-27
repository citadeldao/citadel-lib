import { mergeWith } from 'lodash'

// deep clone with array replacement
export const merge = (oldValue, newValue) => {
  const customizer = (objValue, srcValue) => {
    // replace arrays
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      return srcValue
    }
  }
  mergeWith(oldValue, newValue, customizer)
}
