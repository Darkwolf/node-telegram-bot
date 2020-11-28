const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorTranslationFile extends PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorTranslationFile.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorTranslationFile.source = PassportElementErrorSource.TRANSLATION_FILE
PassportElementErrorTranslationFile.from = (type, fileHash, message) => new PassportElementErrorTranslationFile(type, fileHash, message)

module.exports = PassportElementErrorTranslationFile
