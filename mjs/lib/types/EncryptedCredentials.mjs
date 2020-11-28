export default class EncryptedCredentials {
  static from(data, context) {
    return new EncryptedCredentials(data, context)
  }

  static fromParams(params = {}, context) {
    return new EncryptedCredentials({
      data: params.data,
      hash: params.hash,
      secret: params.secret
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setData(data.data)
      .setHash(data.hash)
      .setSecret(data.secret)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setData(data) {
    this.data = data
    return this
  }

  setHash(hash) {
    this.hash = hash
    return this
  }

  setSecret(secret) {
    this.secret = secret
    return this
  }

  toJSON() {
    const data = {}
    if (this.data) {
      data.data = this.data
    }
    if (this.hash) {
      data.hash = this.hash
    }
    if (this.secret) {
      data.secret = this.secret
    }
    return data
  }
}
