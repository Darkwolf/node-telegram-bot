const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorFrontSide extends PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorFrontSide.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorFrontSide.source = PassportElementErrorSource.FRONT_SIDE
PassportElementErrorFrontSide.from = (type, fileHash, message) => new PassportElementErrorFrontSide(type, fileHash, message)

module.exports = PassportElementErrorFrontSide
