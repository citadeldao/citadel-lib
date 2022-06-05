import { _saveViewingKeyToInstance } from './_saveViewingKeyToInstance'
import { _saveViewingKeysToStorage } from './_saveViewingKeysToStorage'
import { _useSnip20Manager } from './_useSnip20Manager'
import { getSavedViewingKeys } from './getSavedViewingKeys'
import { importViewingKey } from './importViewingKey'
import { init } from './init'
import { setViewingKey } from './setViewingKey'
import { checkSavedAndSimpleVKValidity } from './checkSavedAndSimpleVKValidity'
import { convertScrtToSecretScrt } from './convertScrtToSecretScrt'
import { deleteViewingKey } from './deleteViewingKey'
import { signAndSend } from './signAndSend'
import { updateSubtokensList } from './updateSubtokensList'
import { getSnip20SubtokensList } from './getSnip20SubtokensList'

export default {
  _saveViewingKeyToInstance,
  _saveViewingKeysToStorage,
  _useSnip20Manager,
  getSavedViewingKeys,
  importViewingKey,
  deleteViewingKey,
  init,
  setViewingKey,
  checkSavedAndSimpleVKValidity,
  convertScrtToSecretScrt,
  signAndSend,
  updateSubtokensList,
  getSnip20SubtokensList,
}
