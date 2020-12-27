const types = require('./')
const constants = require('../constants')

class EncryptedPassportElement {
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
    return this.type === constants.PassportElementType.PERSONAL_DETAILS
  }

  get isPassport() {
    return this.type === constants.PassportElementType.PASSPORT
  }

  get isDriverLicense() {
    return this.type === constants.PassportElementType.DRIVER_LICENSE
  }

  get isIdentityCard() {
    return this.type === constants.PassportElementType.IDENTITY_CARD
  }

  get isAddress() {
    return this.type === constants.PassportElementType.ADDRESS
  }

  get isUtilityBill() {
    return this.type === constants.PassportElementType.UTILITY_BILL
  }

  get isBankStatement() {
    return this.type === constants.PassportElementType.BANK_STATEMENT
  }

  get isRentalAgreement() {
    return this.type === constants.PassportElementType.RENTAL_AGREEMENT
  }

  get isPassportRegistration() {
    return this.type === constants.PassportElementType.PASSPORT_REGISTRATION
  }

  get isTemporaryRegistration() {
    return this.type === constants.PassportElementType.TEMPORARY_REGISTRATION
  }

  get isPhoneNumber() {
    return this.type === constants.PassportElementType.PHONE_NUMBER
  }

  get isEmail() {
    return this.type === constants.PassportElementType.EMAIL
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
      file instanceof types.PassportFile ? file : new types.PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setFrontSide(file) {
    this.frontSide = file ? (
      file instanceof types.PassportFile ? file : new types.PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setReverseSide(file) {
    this.reverseSide = file ? (
      file instanceof types.PassportFile ? file : new types.PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setSelfie(file) {
    this.selfie = file ? (
      file instanceof types.PassportFile ? file : new types.PassportFile(file, this.context)
    ) : undefined
    return this
  }

  setTranslation(files) {
    this.translation = files ? files.map(file =>
      file instanceof types.PassportFile ? file : new types.PassportFile(file, this.context)
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
EncryptedPassportElement.from = (data, context) => new EncryptedPassportElement(data, context)
EncryptedPassportElement.fromParams = (params = {}, context) => {
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
    data.files = data.files.map(file => types.PassportFile.fromParams(file, context))
  }
  if (data.frontSide) {
    data.frontSide = types.PassportFile.fromParams(data.frontSide, context)
  }
  if (data.reverseSide) {
    data.reverseSide = types.PassportFile.fromParams(data.reverseSide, context)
  }
  if (data.selfie) {
    data.selfie = types.PassportFile.fromParams(data.selfie, context)
  }
  if (data.translation) {
    data.translation = data.translation.map(file => types.PassportFile.fromParams(file, context))
  }
  return new EncryptedPassportElement(data, context)
}

module.exports = EncryptedPassportElement
