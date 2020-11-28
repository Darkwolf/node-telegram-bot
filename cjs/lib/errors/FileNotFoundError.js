const NotFoundError = require('./NotFoundError')

class FileNotFoundError extends NotFoundError {
  constructor(id) {
    super(`File not found: '${id}'.`, FileNotFoundError.code)
    this.setName(FileNotFoundError.name)
  }
}
FileNotFoundError.name = 'FileNotFoundError'
FileNotFoundError.code = 'file-not-found'

module.exports = FileNotFoundError
