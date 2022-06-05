import publicActions from './publicActions'
import { actionDecorator } from './actionDecorator'

// wrap lib methods to catch errors and format the response
for (let action in publicActions) {
  publicActions[action] = actionDecorator(publicActions[action], action)
}

export default publicActions
