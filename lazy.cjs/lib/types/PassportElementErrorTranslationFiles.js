const types = require('./')
const constants = require('../constants')

class PassportElementErrorTranslationFiles extends types.PassportElementError {
  constructor(type, fileHashes, message) {
    super(PassportElementErrorTranslationFiles.source, type, message, {
      fileHashes
    })
  }
}
PassportElementErrorTranslationFiles.source = constants.PassportElementErrorSource.TRANSLATION_FILES
PassportElementErrorTranslationFiles.from = (type, fileHashes, message) => new PassportElementErrorTranslationFiles(type, fileHashes, message)

module.exports = PassportElementErrorTranslationFiles
