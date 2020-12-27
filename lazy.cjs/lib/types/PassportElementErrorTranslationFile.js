const types = require('./')
const constants = require('../constants')

class PassportElementErrorTranslationFile extends types.PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorTranslationFile.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorTranslationFile.source = constants.PassportElementErrorSource.TRANSLATION_FILE
PassportElementErrorTranslationFile.from = (type, fileHash, message) => new PassportElementErrorTranslationFile(type, fileHash, message)

module.exports = PassportElementErrorTranslationFile
