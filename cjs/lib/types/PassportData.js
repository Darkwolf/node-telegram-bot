const EncryptedPassportElement = require('./EncryptedPassportElement')
const EncryptedCredentials = require('./EncryptedCredentials')

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
      element instanceof EncryptedPassportElement ? element : new EncryptedPassportElement(element, this.context)
    ) : undefined
    return this
  }

  setCredentials(credentials) {
    this.credentials = credentials ? (
      credentials instanceof EncryptedCredentials ? credentials : new EncryptedCredentials(credentials, this.context)
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
    data.data = data.data.map(element => EncryptedPassportElement.fromParams(element, context))
  }
  if (data.credentials) {
    data.credentials = EncryptedCredentials.fromParams(data.credentials, context)
  }
  return new PassportData(data, context)
}

module.exports = PassportData
