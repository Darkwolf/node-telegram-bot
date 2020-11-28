import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorSelfie extends PassportElementError {
  static source = PassportElementErrorSource.SELFIE

  static from(type, fileHash, message) {
    return new PassportElementErrorSelfie(type, fileHash, message)
  }

  constructor(type, fileHash, message) {
    super(PassportElementErrorSelfie.source, type, message, {
      fileHash
    })
  }
}
