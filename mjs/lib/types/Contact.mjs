import Helper from '@darkwolf/helper.mjs'

export default class Contact {
  static from(data, context) {
    return new Contact(data, context)
  }

  static fromParams(params = {}, context) {
    return new Contact({
      phoneNumber: params.phone_number,
      firstName: params.first_name,
      lastName: params.last_name,
      userId: params.user_id,
      vcard: params.vcard
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setPhoneNumber(data.phoneNumber)
      .setFirstName(data.firstName)
      .setLastName(data.lastName)
      .setUserId(data.userId)
      .setVcard(data.vcard)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
    return this
  }

  setFirstName(firstName) {
    this.firstName = firstName
    return this
  }

  setLastName(lastName) {
    this.lastName = lastName
    return this
  }

  setUserId(id) {
    this.userId = id
    return this
  }

  setVcard(vcard) {
    this.vcard = vcard
    return this
  }

  toJSON() {
    const data = {}
    if (this.phoneNumber) {
      data.phoneNumber = this.phoneNumber
    }
    if (Helper.exists(this.firstName)) {
      data.firstName = this.firstName
    }
    if (Helper.exists(this.lastName)) {
      data.lastName = this.lastName
    }
    if (this.userId) {
      data.userId = this.userId
    }
    if (Helper.exists(this.vcard)) {
      data.vcard = this.vcard
    }
    return data
  }
}
