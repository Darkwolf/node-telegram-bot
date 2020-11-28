const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorUnspecified extends PassportElementError {
  constructor(type, elementHash, message) {
    super(PassportElementErrorUnspecified.source, type, message, {
      elementHash
    })
  }
}
PassportElementErrorUnspecified.source = PassportElementErrorSource.UNSPECIFIED
PassportElementErrorUnspecified.from = (type, elementHash, message) => new PassportElementErrorUnspecified(type, elementHash, message)

module.exports = PassportElementErrorUnspecified
