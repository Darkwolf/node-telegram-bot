import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorUnspecified extends PassportElementError {
  static source = PassportElementErrorSource.UNSPECIFIED

  static from(type, elementHash, message) {
    return new PassportElementErrorUnspecified(type, elementHash, message)
  }

  constructor(type, elementHash, message) {
    super(PassportElementErrorUnspecified.source, type, message, {
      elementHash
    })
  }
}
