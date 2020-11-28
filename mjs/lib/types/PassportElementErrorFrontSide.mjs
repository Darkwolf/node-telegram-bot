import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorFrontSide extends PassportElementError {
  static source = PassportElementErrorSource.FRONT_SIDE

  static from(type, fileHash, message) {
    return new PassportElementErrorFrontSide(type, fileHash, message)
  }

  constructor(type, fileHash, message) {
    super(PassportElementErrorFrontSide.source, type, message, {
      fileHash
    })
  }
}
