const { PassportElementErrorSource } = require('../constants')
const PassportElementError = require('./PassportElementError')

class PassportElementErrorFile extends PassportElementError {
  constructor(type, fileHash, message) {
    super(PassportElementErrorFile.source, type, message, {
      fileHash
    })
  }
}
PassportElementErrorFile.source = PassportElementErrorSource.FILE
PassportElementErrorFile.from = (type, fileHash, message) => new PassportElementErrorFile(type, fileHash, message)

module.exports = PassportElementErrorFile
