const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorDataField extends PassportElementError {
  constructor(type, dataHash, fieldName, message) {
    super(PassportElementErrorDataField.source, type, message, {
      dataHash,
      fieldName
    })
  }
}
PassportElementErrorDataField.source = PassportElementErrorSource.DATA
PassportElementErrorDataField.from = (type, dataHash, fieldName, message) => new PassportElementErrorDataField(type, dataHash, fieldName, message)

module.exports = PassportElementErrorDataField
