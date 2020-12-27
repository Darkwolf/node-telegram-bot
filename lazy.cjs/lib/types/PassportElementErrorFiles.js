const types = require('./')
const constants = require('../constants')

class PassportElementErrorFiles extends types.PassportElementError {
  constructor(type, fileHashes, message) {
    super(PassportElementErrorFiles.source, type, message, {
      fileHashes
    })
  }
}
PassportElementErrorFiles.source = constants.PassportElementErrorSource.FILES
PassportElementErrorFiles.from = (type, fileHashes, message) => new PassportElementErrorFiles(type, fileHashes, message)

module.exports = PassportElementErrorFiles
