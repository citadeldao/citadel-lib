import transferActions from './transfer'
import stakeActions from './stake'
import unstakeActions from './unstake'
import restakeActions from './restake'
import claimActions from './claim'
import convertToScrtActions from './convertToScrt'

const actions = {
  transfer: {
    ...transferActions,
  },
  stake: {
    ...stakeActions,
  },
  unstake: {
    ...unstakeActions,
  },
  restake: {
    ...restakeActions,
  },
  claim: {
    ...claimActions,
  },
  convertToScrt: {
    ...convertToScrtActions,
  },
}

export default {
  getItem(actionName, actionType) {
    return actions[actionName][actionType]
  },
}
