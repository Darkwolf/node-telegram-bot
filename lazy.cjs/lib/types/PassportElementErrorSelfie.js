const types = require('./')
const constants = require('../constants')

class PassportElementErrorSelfie extends types.PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorSelfie.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorSelfie.source = constants.PassportElementErrorSource.SELFIE
PassportElementErrorSelfie.from = (type, fileHash, message) => new PassportElementErrorSelfie(type, fileHash, message)

module.exports = PassportElementErrorSelfie
