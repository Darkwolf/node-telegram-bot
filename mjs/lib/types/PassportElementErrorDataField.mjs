import { PassportElementErrorSource } from '../constants/index.mjs'
import PassportElementError from './PassportElementError.mjs'

export default class PassportElementErrorDataField extends PassportElementError {
  static source = PassportElementErrorSource.DATA

  static from(type, dataHash, fieldName, message) {
    return new PassportElementErrorDataField(type, dataHash, fieldName, message)
  }

  constructor(type, dataHash, fieldName, message) {
    super(PassportElementErrorDataField.source, type, message, {
      dataHash,
      fieldName
    })
  }
}
