const types = require('./')

class PassportData {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setData(data.data)
      .setCredentials(data.credentials)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setData(data) {
    this.data = data ? data.map(element =>
      element instanceof types.EncryptedPassportElement ? element : new types.EncryptedPassportElement(element, this.context)
    ) : undefined
    return this
  }

  setCredentials(credentials) {
    this.credentials = credentials ? (
      credentials instanceof types.EncryptedCredentials ? credentials : new types.EncryptedCredentials(credentials, this.context)
    ) : undefined
    return this
  }

  toJSON() {
    const data = {}
    if (this.data) {
      data.data = this.data.map(element => element.toJSON())
    }
    if (this.credentials) {
      data.credentials = this.credentials.toJSON()
    }
    return data
  }
}
PassportData.from = (data, context) => new PassportData(data, context)
PassportData.fromParams = (params = {}, context) => {
  const data = {
    data: params.data,
    credentials: params.credentials
  }
  if (data.data) {
    data.data = data.data.map(element => types.EncryptedPassportElement.fromParams(element, context))
  }
  if (data.credentials) {
    data.credentials = types.EncryptedCredentials.fromParams(data.credentials, context)
  }
  return new PassportData(data, context)
}

module.exports = PassportData
