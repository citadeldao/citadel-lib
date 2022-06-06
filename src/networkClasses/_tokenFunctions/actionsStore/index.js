import { transfer } from './transfer'
import { stake } from './stake'
import { unstake } from './unstake'
import { restake } from './restake'
import { claim } from './claim'
import { convertToScrt } from './convertToScrt'

// group all actions
const actions = {
  transfer,
  stake,
  unstake,
  restake,
  claim,
  convertToScrt,
}

// get action function by name and type
export const actionsStore = {
  getItem(actionName, actionType) {
    return actions[actionName][actionType]
  },
}
