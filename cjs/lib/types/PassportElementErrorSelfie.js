const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorSelfie extends PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorSelfie.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorSelfie.source = PassportElementErrorSource.SELFIE
PassportElementErrorSelfie.from = (type, fileHash, message) => new PassportElementErrorSelfie(type, fileHash, message)

module.exports = PassportElementErrorSelfie
