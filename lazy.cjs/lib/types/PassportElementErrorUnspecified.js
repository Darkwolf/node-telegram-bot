const types = require('./')
const constants = require('../constants')

class PassportElementErrorUnspecified extends types.PassportElementError {
  constructor(type, elementHash, message) {
    super(PassportElementErrorUnspecified.source, type, message, {
      elementHash
    })
  }
}
PassportElementErrorUnspecified.source = constants.PassportElementErrorSource.UNSPECIFIED
PassportElementErrorUnspecified.from = (type, elementHash, message) => new PassportElementErrorUnspecified(type, elementHash, message)

module.exports = PassportElementErrorUnspecified
