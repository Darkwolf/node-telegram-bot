const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorReverseSide extends PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorReverseSide.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorReverseSide.source = PassportElementErrorSource.REVERSE_SIDE
PassportElementErrorReverseSide.from = (type, fileHash, message) => new PassportElementErrorReverseSide(type, fileHash, message)

module.exports = PassportElementErrorReverseSide
