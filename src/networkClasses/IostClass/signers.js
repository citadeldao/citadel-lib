import { sha3_256 as sha3256 } from 'js-sha3'
import Long from 'long'

export const signTxByPrivateKey = async (
  data,
  privateKey,
  publicKey,
  address
) => {
  const moreLimit =
    data.actions[0].actionName === 'voterWithdraw'
      ? data.gasLimit * 2
      : data.gasLimit
  const transformedData = {
    actions: data.actions.map((action) => ({
      actionName: action.actionName,
      contract: action.contract,
      data: action.data,
    })),
    amountLimit: data.amount_limit,
    chainId: data.chain_id,
    delay: data.delay,
    expiration: data.expiration,
    gasLimit: moreLimit,
    gasRatio: data.gasRatio,
    publisher: data.publisher,
    publisherSigs: data.publisher_sigs,
    reserved: data.reserved,
    signatures: data.signatures,
    signers: data.signers,
    time: data.time,
  }

  transformedData.publisher = address
  const info = publishHash(transformedData)
  const sig = await signData(info, privateKey)

  const publisherSigs = [].concat(transformedData.publisherSigs)
  publisherSigs.push({
    signature: Buffer.from(sig, 'hex').toString('base64'),
    algorithm: 'ED25519',
    publicKey: publicKey.toString('base64'),
  })
  transformedData.publisherSigs = publisherSigs

  return transformedData
}
const signMessageByEd25519 = async (msg, privateKey) => {
  // dynamic import of large module (for fast init)
  const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
  await sodiumsumo.ready
  return Buffer.from(
    sodiumsumo.crypto_sign_detached(msg, Buffer.from(privateKey))
  ).toString('hex')
}
class Codec {
  buf
  constructor() {
    this.buf = Buffer.alloc(0)
  }

  pushInt(len) {
    const bb = Buffer.alloc(4)
    bb.writeInt32BE(len, 0)
    this.buf = Buffer.concat([this.buf, bb])
    return this
  }

  pushByte(n) {
    const bb = Buffer.alloc(1)
    bb.writeUInt8(n, 0)
    this.buf = Buffer.concat([this.buf, bb])
    return this
  }

  pushInt64(n) {
    const l = Long.fromString(n + '') // TODO: replace to BN
    const bb = Buffer.alloc(8)
    bb.writeInt32BE(l.high, 0)
    bb.writeInt32BE(l.low, 4)
    this.buf = Buffer.concat([this.buf, bb])
    return this
  }

  pushString(s) {
    const bb = Buffer.from(s)
    this.pushInt(bb.length)
    this.buf = Buffer.concat([this.buf, bb])
    return this
  }

  pushBytes(b) {
    this.pushInt(b.length)
    this.buf = Buffer.concat([this.buf, b])
    return this
  }
}

class Signature {
  constructor(signature, algorithm, publicKey) {
    this.signature = signature
    this.algorithm = algorithm
    this.publicKey = publicKey
  }

  bytes() {
    const c = new Codec()
    c.pushByte(this.algorithm === 'ed25519' ? 0 : 1)
    c.pushBytes(this.signature)
    c.pushBytes(this.publicKey)

    return c.buf
  }

  toJSON() {
    return {
      algorithm: this.algorithm.toUpperCase(),
      publicKey: this.publicKey.toString('base64'),
      signature: Buffer.from(this.signature, 'hex').toString('base64'),
    }
  }
}

const signData = async (publishHash, privateKey) => {
  // dynamic import of large module (for fast init)
  const { default: sodiumsumo } = await import('libsodium-wrappers-sumo')
  await sodiumsumo.ready
  return sodiumsumo.crypto_sign_detached(
    Buffer.from(publishHash),
    Buffer.from(privateKey)
  )
}

export class MessageSigner {
  constructor(rawData) {
    this.rawData = rawData
  }

  build() {
    const c = new Codec()
    c.pushString(this.rawData.message)
    return c.buf
  }

  async addPublishSign(publisher, algType, publicKey, privateKey) {
    this.rawData.publisher = publisher
    const info = this.publishHash()
    const sig = await signMessageByEd25519(Buffer.from(info), privateKey)
    let publisherSigs = {}
    publisherSigs = new Signature(sig, algType, publicKey)
    this.rawData.publisherSigs = publisherSigs
  }

  getData() {
    return this.rawData.publisherSigs
  }

  publishHash() {
    return sha3256.digest(this.build())
  }
}

const publishHash = (rawData) => {
  const list = [
    int64(rawData.time),
    int64(rawData.expiration),
    int64(rawData.gasRatio * 100),
    int64(rawData.gasLimit * 100),
    int64(rawData.delay),
    int(rawData.chainId),
  ]

  if (!rawData.reserved) {
    list.push(int(0))
  }

  list.push(int(rawData.signers.length))

  for (let i = 0; i < rawData.signers.length; i++) {
    list.push(string(rawData.signers[i]))
  }

  list.push(int(rawData.actions.length))

  for (let i = 0; i < rawData.actions.length; i++) {
    const actionsBuf = Buffer.concat([
      string(rawData.actions[i].contract),
      string(rawData.actions[i].actionName),
      string(rawData.actions[i].data),
    ])
    list.push(int(actionsBuf.length), actionsBuf)
  }

  list.push(int(rawData.amountLimit.length))

  for (let i = 0; i < rawData.amountLimit.length; i++) {
    const amountLimitBuf = Buffer.concat([
      string(rawData.amountLimit[i].token),
      string(rawData.amountLimit[i].value + ''),
    ])
    list.push(int(amountLimitBuf.length), amountLimitBuf)
  }

  list.push(int(rawData.signatures.length))

  for (let i = 0; i < rawData.signatures.length; i++) {
    list.push(bytes(rawData.signatures[i].bytes()))
  }
  return sha3256.digest(Buffer.concat(list))
}

const int = (len) => {
  const bb = Buffer.alloc(4)
  bb.writeInt32BE(len, 0)
  return bb
}

const int64 = (n) => {
  const l = Long.fromString(n + '') // TODO: replace to BN
  const bb = Buffer.alloc(8)
  bb.writeInt32BE(l.high, 0)
  bb.writeInt32BE(l.low, 4)
  return bb
}

const string = (s) => {
  const bb = Buffer.from(s)
  return Buffer.concat([int(bb.length), bb])
}

const bytes = (b) => {
  return Buffer.concat([int(b.length), b])
}
