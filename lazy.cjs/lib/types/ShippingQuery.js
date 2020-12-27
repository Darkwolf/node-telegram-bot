const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class ShippingQuery {
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
      user instanceof types.User ? user : new types.User(user, this.context)
    ) : undefined
    return this
  }

  setInvoicePayload(payload) {
    this.invoicePayload = payload
    return this
  }

  setShippingAddress(address) {
    this.shippingAddress = address ? (
      address instanceof types.ShippingAddress ? address : new types.ShippingAddress(address)
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
ShippingQuery.from = (data, context) => new ShippingQuery(data, context)
ShippingQuery.fromParams = (params = {}, context) => {
  const data = {
    id: params.id,
    from: params.from,
    invoicePayload: params.invoice_payload,
    shippingAddress: params.shipping_address
  }
  if (data.from) {
    data.from = types.User.fromParams(data.from, context)
  }
  if (data.shippingAddress) {
    data.shippingAddress = types.ShippingAddress.fromParams(data.shippingAddress)
  }
  return new ShippingQuery(data, context)
}

module.exports = ShippingQuery
