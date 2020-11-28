import NotFoundError from './NotFoundError.mjs'

export default class FileNotFoundError extends NotFoundError {
  static name = 'FileNotFoundError'
  static code = 'file-not-found'

  constructor(id) {
    super(`File not found: '${id}'.`, FileNotFoundError.code)
    this.setName(FileNotFoundError.name)
  }
}
