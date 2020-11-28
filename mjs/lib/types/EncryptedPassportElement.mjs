import { PassportElementType } from '../constants/index.mjs'
import PassportFile from './PassportFile.mjs'

export default class EncryptedPassportElement {
  static from(data, context) {
    return new EncryptedPassportElement(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      type: params.type,
      data: params.data,
      phoneNumber: params.phone_number,
      email: params.email,
      files: params.files,
      frontSide: params.front_side,
      reverseSide: params.reverse_side,
      selfie: params.selfie,
      translation: params.translation,
      hash: params.hash
    }
    if (data.files) {
      data.files = data.files.map(file => PassportFile.fromParams(file, context))
    }
    if (data.frontSide) {
      data.frontSide = PassportFile.fromParams(data.frontSide, context)
    }
    if (data.reverseSide) {
      data.reverseSide = PassportFile.fromParams(data.reverseSide, context)
    }
    if (data.selfie) {
      data.selfie = PassportFile.fromParams(data.selfie, context)
    }
    if (data.translation) {
      data.translation = data.translation.map(file => PassportFile.fromParams(file, context))
    }
    return new EncryptedPassportElement(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setType(data.type)
      .setData(data.data)
      .setPhoneNumber(data.phoneNumber)
      .setEmail(data.email)
      .setFiles(data.files)
      .setFrontSide(data.frontSide)
      .setReverseSide(data.reverseSide)
      .setSelfie(data.selfie)
      .setTranslation(data.translation)
      .setHash(data.hash)
  }

  get isPersonalDetails() {
    return this.type === PassportElementType.PERSONAL_DETAILS
  }

  get isPassport() {
    return this.type === PassportElementType.PASSPORT
  }

  get isDriverLicense() {
    return this.type === PassportElementType.DRIVER_LICENSE
  }

  get isIdentityCard() {
    return this.type === PassportElementType.IDENTITY_CARD
  }

  get isAddress() {
    return this.type === PassportElementType.ADDRESS
  }

  get isUtilityBill() {
    return this.type === PassportElementType.UTILITY_BILL
  }

  get isBankStatement() {
    return this.type === PassportElementType.BANK_STATEMENT
  }

  get isRentalAgreement() {
    return this.type === PassportElementType.RENTAL_AGREEMENT
  }

  get isPassportRegistration() {
    return this.type === PassportElementType.PASSPORT_REGISTRATION
  }

  get isTemporaryRegistration() {
    return this.type === PassportElementType.TEMPORARY_REGISTRATION
  }

  get isPhoneNumber() {
    return this.type === PassportElementType.PHONE_NUMBER
  }

  get isEmail() {
    return this.type === PassportElementType.EMAIL
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setData(data) {
    this.data = data
    return this
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
    return this
  }

  setEmail(email) {
    this.email = email
    return this
  }

  setFiles(files) {
    this.files = files ? files.map(file =>
      file instanceof PassportFile ? file : new PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setFrontSide(file) {
    this.frontSide = file ? (
      file instanceof PassportFile ? file : new PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setReverseSide(file) {
    this.reverseSide = file ? (
      file instanceof PassportFile ? file : new PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setSelfie(file) {
    this.selfie = file ? (
      file instanceof PassportFile ? file : new PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setTranslation(files) {
    this.translation = files ? files.map(file =>
      file instanceof PassportFile ? file : new PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setHash(hash) {
    this.hash = hash
    return this
  }

  toJSON() {
    const data = {}
    if (this.type) {
      data.type = this.type
    }
    if (this.data) {
      data.data = this.data
    }
    if (this.phoneNumber) {
      data.phoneNumber = this.phoneNumber
    }
    if (this.email) {
      data.email = this.email
    }
    if (this.files) {
      data.files = this.files.map(file => file.toJSON())
    }
    if (this.frontSide) {
      data.frontSide = this.frontSide.toJSON()
    }
    if (this.reverseSide) {
      data.reverseSide = this.reverseSide.toJSON()
    }
    if (this.selfie) {
      data.selfie = this.selfie.toJSON()
    }
    if (this.translation) {
      data.translation = this.translation.map(file => file.toJSON())
    }
    if (this.hash) {
      data.hash = this.hash
    }
    return data
  }
}
