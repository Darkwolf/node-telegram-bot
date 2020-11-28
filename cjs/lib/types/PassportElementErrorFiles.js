const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorFiles extends PassportElementError {
  constructor(type, fileHashes, message) {
    super(PassportElementErrorFiles.source, type, message, {
      fileHashes
    })
  }
}
PassportElementErrorFiles.source = PassportElementErrorSource.FILES
PassportElementErrorFiles.from = (type, fileHashes, message) => new PassportElementErrorFiles(type, fileHashes, message)

module.exports = PassportElementErrorFiles
