const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorTranslationFiles extends PassportElementError {
  constructor(type, fileHashes, message) {
    super(PassportElementErrorTranslationFiles.source, type, message, {
      fileHashes
    })
  }
}
PassportElementErrorTranslationFiles.source = PassportElementErrorSource.TRANSLATION_FILES
PassportElementErrorTranslationFiles.from = (type, fileHashes, message) => new PassportElementErrorTranslationFiles(type, fileHashes, message)

module.exports = PassportElementErrorTranslationFiles
