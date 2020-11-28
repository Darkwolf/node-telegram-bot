import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorTranslationFile extends PassportElementError {
  static source = PassportElementErrorSource.TRANSLATION_FILE

  static from(type, fileHash, message) {
    return new PassportElementErrorTranslationFile(type, fileHash, message)
  }

  constructor(type, fileHash, message) {
    super(PassportElementErrorTranslationFile.source, type, message, {
      fileHash
    })
  }
}
