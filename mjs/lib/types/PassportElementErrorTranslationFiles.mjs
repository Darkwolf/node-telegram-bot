import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorTranslationFiles extends PassportElementError {
  static source = PassportElementErrorSource.TRANSLATION_FILES

  static from(type, fileHashes, message) {
    return new PassportElementErrorTranslationFiles(type, fileHashes, message)
  }

  constructor(type, fileHashes, message) {
    super(PassportElementErrorTranslationFiles.source, type, message, {
      fileHashes
    })
  }
}
