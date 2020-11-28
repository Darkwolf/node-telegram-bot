import Helper from '@darkwolf/helper.mjs'
import User from './User.mjs'
import ShippingAddress from './ShippingAddress.mjs'

export default class ShippingQuery {
  static from(data, context) {
    return new ShippingQuery(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      id: params.id,
      from: params.from,
      invoicePayload: params.invoice_payload,
      shippingAddress: params.shipping_address
    }
    if (data.from) {
      data.from = User.fromParams(data.from, context)
    }
    if (data.shippingAddress) {
      data.shippingAddress = ShippingAddress.fromParams(data.shippingAddress)
    }
    return new ShippingQuery(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setFrom(data.from)
      .setInvoicePayload(data.invoicePayload)
      .setShippingAddress(data.shippingAddress)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setFrom(user) {
    this.from = user ? (
      user instanceof User ? user : new User(user, this.context)
    ) : undefined
    return this
  }

  setInvoicePayload(payload) {
    this.invoicePayload = payload
    return this
  }

  setShippingAddress(address) {
    this.shippingAddress = address ? (
      address instanceof ShippingAddress ? address : new ShippingAddress(address)
    ) : undefined
    return this
  }

  answer(shippingOptions) {
    return this.context.telegramBot.answerShippingQuery(this.id, shippingOptions)
  }

  answerError(errorMessage) {
    return this.context.telegramBot.answerShippingQueryError(this.id, errorMessage)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (Helper.exists(this.invoicePayload)) {
      data.invoicePayload = this.invoicePayload
    }
    if (this.shippingAddress) {
      data.shippingAddress = this.shippingAddress.toJSON()
    }
    return data
  }
}
