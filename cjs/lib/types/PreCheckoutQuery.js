const Helper = require('@darkwolf/helper.cjs')
const User = require('./User')
const OrderInfo = require('./OrderInfo')

class PreCheckoutQuery {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setFrom(data.from)
      .setCurrency(data.currency)
      .setTotalAmount(data.totalAmount)
      .setInvoicePayload(data.invoicePayload)
      .setShippingOptionId(data.shippingOptionId)
      .setOrderInfo(data.orderInfo)
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

  setCurrency(currency) {
    this.currency = currency
    return this
  }

  setTotalAmount(amount) {
    this.totalAmount = amount
    return this
  }

  setInvoicePayload(payload) {
    this.invoicePayload = payload
    return this
  }

  setShippingOptionId(id) {
    this.shippingOptionId = id
    return this
  }

  setOrderInfo(orderInfo) {
    this.orderInfo = orderInfo ? (
      orderInfo instanceof OrderInfo ? orderInfo : new OrderInfo(orderInfo, this.context)
    ) : undefined
    return this
  }

  answer() {
    return this.context.telegramBot.answerPreCheckoutQuery(this.id)
  }

  answerError(errorMessage) {
    return this.context.telegramBot.answerPreCheckoutQueryError(this.id, errorMessage)
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.from) {
      data.from = this.from.toJSON()
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.totalAmount)) {
      data.totalAmount = this.totalAmount
    }
    if (Helper.exists(this.invoicePayload)) {
      data.invoicePayload = this.invoicePayload
    }
    if (this.shippingOptionId) {
      data.shippingOptionId = this.shippingOptionId
    }
    if (this.orderInfo) {
      data.orderInfo = this.orderInfo.toJSON()
    }
    return data
  }
}
PreCheckoutQuery.from = (data, context) => new PreCheckoutQuery(data, context)
PreCheckoutQuery.fromParams = (params = {}, context) => {
  const data = {
    id: params.id,
    from: params.from,
    currency: params.currency,
    totalAmount: params.total_amount,
    invoicePayload: params.invoice_payload,
    shippingOptionId: params.shipping_option_id,
    orderInfo: params.order_info
  }
  if (data.from) {
    data.from = User.fromParams(data.from, context)
  }
  if (data.orderInfo) {
    data.orderInfo = OrderInfo.fromParams(data.orderInfo, context)
  }
  return new PreCheckoutQuery(data, context)
}

module.exports = PreCheckoutQuery
