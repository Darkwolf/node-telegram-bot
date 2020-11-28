import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorReverseSide extends PassportElementError {
  static source = PassportElementErrorSource.REVERSE_SIDE

  static from(type, fileHash, message) {
    return new PassportElementErrorReverseSide(type, fileHash, message)
  }

  constructor(type, fileHash, message) {
    super(PassportElementErrorReverseSide.source, type, message, {
      fileHash
    })
  }
}
