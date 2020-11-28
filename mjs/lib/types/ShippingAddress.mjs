import Helper from '@darkwolf/helper.mjs'

export default class ShippingAddress {
  static from(data) {
    return new ShippingAddress(data)
  }

  static fromParams(params = {}) {
    return new ShippingAddress({
      countryCode: params.country_code,
      state: params.state,
      city: params.city,
      streetLine1: params.street_line1,
      streetLine2: params.street_line2,
      postCode: params.post_code
    })
  }

  constructor(data = {}) {
    this
      .setCountryCode(data.countryCode)
      .setState(data.state)
      .setCity(data.city)
      .setStreetLine1(data.streetLine1)
      .setStreetLine2(data.streetLine2)
      .setPostCode(data.postCode)
  }

  setCountryCode(code) {
    this.countryCode = code
    return this
  }

  setState(state) {
    this.state = state
    return this
  }

  setCity(city) {
    this.city = city
    return this
  }

  setStreetLine1(address) {
    this.streetLine1 = address
    return this
  }

  setStreetLine2(address) {
    this.streetLine2 = address
    return this
  }

  setPostCode(code) {
    this.postCode = code
    return this
  }

  toJSON() {
    const data = {}
    if (this.countryCode) {
      data.countryCode = this.countryCode
    }
    if (Helper.exists(this.state)) {
      data.state = this.sate
    }
    if (Helper.exists(this.city)) {
      data.city = this.city
    }
    if (Helper.exists(this.streetLine1)) {
      data.streetLine1 = this.streetLine1
    }
    if (Helper.exists(this.streetLine2)) {
      data.streetLine2 = this.streetLine2
    }
    if (this.postCode) {
      data.postCode = this.postCode
    }
    return data
  }
}
