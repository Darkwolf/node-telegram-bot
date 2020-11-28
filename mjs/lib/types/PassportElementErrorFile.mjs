import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorFile extends PassportElementError {
  static source = PassportElementErrorSource.FILE

  static from(type, fileHash, message) {
    return new PassportElementErrorFile(type, fileHash, message)
  }

  constructor(type, fileHash, message) {
    super(PassportElementErrorFile.source, type, message, {
      fileHash
    })
  }
}
