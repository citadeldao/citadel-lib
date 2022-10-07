import api from '../../api'
import { checkInitialization, checkTypes } from '../../helpers/checkArguments'

/**
 * Get extension by id
 *
 * @param query STRING (REQUIRED) - extesion id
 *
 * @returns Returns ARRAY with list of apps.
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
 *
 * const response = await citadel.searchExtension('secret')
 *
 * // =>
 * {
 *   result: 'success',
 *   data: [
    {
        "id": 17,
        "name": "Secret Developers App",
        "card_description": "undefined",
        "short_description": "Dev tool for Secret contracts testing",
        "description": "-",
        "background": "",
        "background_color": "#3a5ee5",
        "logo": "https://extensions-admin.s3.eu-central-1.amazonaws.com/SecretDevelopersApp1658844979004.svg",
        "url_video": "undefined",
        "what_you_can": null,
        "url": "https://apps.3ahtim54r.ru/ca-secret-test-app/",
        "networks": [
            "secret"
        ]
    }
  ],
 *   error: null,
 * }
 */

export const searchExtension = async (query) => {
  // checks
  checkInitialization()
  checkTypes(['query', query, ['String']])

  // get data from api
  const { data } = await api.requests.searchExtension({ query })
  return data
}
