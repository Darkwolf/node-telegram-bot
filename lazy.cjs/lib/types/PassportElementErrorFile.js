const types = require('./')
const constants = require('../constants')

class PassportElementErrorFile extends types.PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorFile.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorFile.source = constants.PassportElementErrorSource.FILE
PassportElementErrorFile.from = (type, fileHash, message) => new PassportElementErrorFile(type, fileHash, message)

module.exports = PassportElementErrorFile
