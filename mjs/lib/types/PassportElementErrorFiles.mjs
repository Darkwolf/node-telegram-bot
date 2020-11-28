import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorFiles extends PassportElementError {
  static source = PassportElementErrorSource.FILES

  static from(type, fileHashes, message) {
    return new PassportElementErrorFiles(type, fileHashes, message)
  }

  constructor(type, fileHashes, message) {
    super(PassportElementErrorFiles.source, type, message, {
      fileHashes
    })
  }
}
