const types = require('./')
const constants = require('../constants')

class PassportElementErrorDataField extends types.PassportElementError {
  constructor(type, dataHash, fieldName, message) {
    super(PassportElementErrorDataField.source, type, message, {
      dataHash,
      fieldName
    })
  }
}
PassportElementErrorDataField.source = constants.PassportElementErrorSource.DATA
PassportElementErrorDataField.from = (type, dataHash, fieldName, message) => new PassportElementErrorDataField(type, dataHash, fieldName, message)

module.exports = PassportElementErrorDataField
