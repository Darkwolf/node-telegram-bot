import Helper from '@darkwolf/helper.mjs'
import ShippingAddress from './ShippingAddress.mjs'

export default class OrderInfo {
  static from(data, context) {
    return new OrderInfo(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      name: params.name,
      phoneNumber: params.phone_number,
      email: params.email,
      shippingAddress: params.shipping_address
    }
    if (data.shippingAddress) {
      data.shippingAddress = ShippingAddress.fromParams(data.shippingAddress)
    }
    return new OrderInfo(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setName(data.name)
      .setPhoneNumber(data.phoneNumber)
      .setEmail(data.email)
      .setShippingAddress(data.shippingAddress)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setName(name) {
    this.name = name
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

  setShippingAddress(address) {
    this.shippingAddress = address ? (
      address instanceof ShippingAddress ? address : new ShippingAddress(address)
    ) : undefined
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.name)) {
      data.name = this.name
    }
    if (this.phoneNumber) {
      data.phoneNumber = this.phoneNumber
    }
    if (this.email) {
      data.email = this.email
    }
    if (this.shippingAddress) {
      data.shippingAddress = this.shippingAddress.toJSON()
    }
    return data
  }
}
