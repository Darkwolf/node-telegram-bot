const errors = require('./')

class FileNotFoundError extends errors.NotFoundError {
  constructor(id) {
    super(`File not found: '${id}'.`, FileNotFoundError.code)
    this.setName(FileNotFoundError.name)
  }
}
FileNotFoundError.name = 'FileNotFoundError'
FileNotFoundError.code = 'file-not-found'

module.exports = FileNotFoundError
