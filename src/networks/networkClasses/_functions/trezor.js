import TrezorConnect from 'trezor-connect'

export const prepareTrezorConnection = async () => {
  if (!global.isTrezorInit) {
    await TrezorConnect.init({
      connectSrc: 'https://connect.trezor.io/8/',
      lazyLoad: true, // this param will prevent iframe injection until TrezorConnect.method will be called
      manifest: {
        email: 'citadel.one@gmail.com',
        appUrl: 'http://citadel.one/',
      },
    })

    global.isTrezorInit = true
  }
}
