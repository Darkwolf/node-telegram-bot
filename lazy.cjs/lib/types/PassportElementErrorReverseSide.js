const types = require('./')
const constants = require('../constants')

class PassportElementErrorReverseSide extends types.PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorReverseSide.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorReverseSide.source = constants.PassportElementErrorSource.REVERSE_SIDE
PassportElementErrorReverseSide.from = (type, fileHash, message) => new PassportElementErrorReverseSide(type, fileHash, message)

module.exports = PassportElementErrorReverseSide
