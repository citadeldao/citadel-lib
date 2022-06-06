// Copied from https://github.com/Cryptonomic/ConseilJS/blob/3d26cd6fea3610733ce55825f09a1488121e454d/src/chain/tezos/TezosMessageUtil.ts
const base58check = require('bs58check');
const CryptoUtils = require('./CryptoUtils');

// function dataLength(value) {
//   return ('0000000' + value.toString(16)).slice(-8);
// }

/**
 * Takes a bounded hex string that is known to contain a Tezos address and decodes it. Supports implicit tz1, tz2, tz3 accounts and originated kt1.
 * An address is a public key hash of the account.
 *
 * @param {string} hex Encoded message part.
 */
function readAddress(hex) {
  if (hex.length !== 44 && hex.length !== 42) {
    throw new Error('Incorrect hex length to parse an address');
  }

  let implicitHint =
    hex.length === 44 ? hex.substring(0, 4) : '00' + hex.substring(0, 2);
  let implicitPrefixLength = hex.length === 44 ? 4 : 2;

  if (implicitHint === '0000') {
    // tz1
    return base58check.encode(
      Buffer.from('06a19f' + hex.substring(implicitPrefixLength), 'hex')
    );
  } else if (implicitHint === '0001') {
    // tz2
    return base58check.encode(
      Buffer.from('06a1a1' + hex.substring(implicitPrefixLength), 'hex')
    );
  } else if (implicitHint === '0002') {
    // tz3
    return base58check.encode(
      Buffer.from('06a1a4' + hex.substring(implicitPrefixLength), 'hex')
    );
  } else if (hex.substring(0, 2) === '01' && hex.length === 44) {
    // kt1
    return base58check.encode(
      Buffer.from('025a79' + hex.substring(2, 42), 'hex')
    );
  } else {
    throw new Error('Unrecognized address type');
  }
}

/**
 * Reads an address value from binary and decodes it into a Base58-check address without a prefix.
 *
 * This is data type is referred to as `$contract_id` in the official documentation.
 *
 * @param {Buffer | Uint8Array} b Bytes containing address.
 * @param hint One of: 'kt1', 'tz1', 'tz2', 'tz3'.
 */
function readAddressWithHint(b, hint) {
  const address = !(b instanceof Buffer) ? Buffer.from(b) : b;

  if (hint === 'tz1') {
    return readAddress(`0000${address.toString('hex')}`);
  } else if (hint === 'tz2') {
    return readAddress(`0001${address.toString('hex')}`);
  } else if (hint === 'tz3') {
    return readAddress(`0002${address.toString('hex')}`);
  } else if (hint === 'kt1') {
    return readAddress(`01${address.toString('hex')}00`);
  } else {
    throw new Error(`Unrecognized address hint, '${hint}'`);
  }
}

/**
 * Consumes a Base58-check key and produces a 20 byte key hash, often referred to as address.
 *
 * @param key Base58-check encoded key
 * @param prefix A key hint, eg: 'tz1', 'tz2', etc.
 * @returns Base58-check encoded key hash.
 */
function computeKeyHash(key, prefix = 'tz1') {
  const hash = CryptoUtils.simpleHash(key, 20);
  return readAddressWithHint(hash, prefix);
}

/**
 * Reads the public key from the provided, bounded hex string into a Base58-check string.
 *
 * @param {string} hex Encoded message part.
 * @returns {string} Key.
 */
function readPublicKey(hex) {
  if (hex.length !== 66 && hex.length !== 68) {
    throw new Error(`Incorrect hex length, ${hex.length} to parse a key`);
  }

  let hint = hex.substring(0, 2);
  if (hint === '00') {
    // ed25519
    return base58check.encode(
      Buffer.from('0d0f25d9' + hex.substring(2), 'hex')
    );
  } else if (hint === '01' && hex.length === 68) {
    // secp256k1
    return base58check.encode(
      Buffer.from('03fee256' + hex.substring(2), 'hex')
    );
  } else if (hint === '02' && hex.length === 68) {
    // p256
    return base58check.encode(
      Buffer.from('03b28b7f' + hex.substring(2), 'hex')
    );
  } else {
    throw new Error('Unrecognized key type');
  }
}

/**
 * Reads a key without a prefix from binary and decodes it into a Base58-check representation.
 *
 * @param {Buffer | Uint8Array} b Bytes containing the key.
 * @param hint One of 'edsk' (private key), 'edpk' (public key).
 */
function readKeyWithHint(b, hint) {
  const key = !(b instanceof Buffer) ? Buffer.from(b) : b;

  if (hint === 'edsk') {
    return base58check.encode(
      Buffer.from('2bf64e07' + key.toString('hex'), 'hex')
    );
  } else if (hint === 'edpk') {
    return readPublicKey(`00${key.toString('hex')}`);
  } else {
    throw new Error(`Unrecognized key hint, '${hint}'`);
  }
}

/**
 * Writes a Base58-check key into hex.
 *
 * @param key Key to encode, input is expected to be a base58-check encoded string.
 * @param hint Key type, usually the curve it was generated from, eg: 'edsk'.
 */
function writeKeyWithHint(key, hint) {
  if (hint === 'edsk' || hint === 'edpk') {
    return base58check.decode(key).slice(4);
  } else {
    throw new Error(`Unrecognized key hint, '${hint}'`);
  }
}

export {
  readAddressWithHint,
  computeKeyHash,
  readKeyWithHint,
  writeKeyWithHint,
};
