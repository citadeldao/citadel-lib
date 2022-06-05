// Copied from https://github.com/Cryptonomic/ConseilJS/blob/master/src/utils/CryptoUtils.ts
const blakejs = require('blakejs');

function simpleHash(payload, length){
  return Buffer.from(blakejs.blake2b(payload, null, length)); // Same as libsodium.crypto_generichash
}

export {
  simpleHash
};
