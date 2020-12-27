const types = require('./')
const constants = require('../constants')

class PassportElementErrorFrontSide extends types.PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorFrontSide.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorFrontSide.source = constants.PassportElementErrorSource.FRONT_SIDE
PassportElementErrorFrontSide.from = (type, fileHash, message) => new PassportElementErrorFrontSide(type, fileHash, message)

module.exports = PassportElementErrorFrontSide
