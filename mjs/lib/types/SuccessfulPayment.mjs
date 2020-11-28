import Helper from '@darkwolf/helper.mjs'
import OrderInfo from './OrderInfo.mjs'

export default class SuccessfulPayment {
  static from(data, context) {
    return new SuccessfulPayment(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      id: params.telegram_payment_charge_id,
      providerPaymentId: params.provider_payment_charge_id,
      currency: params.currency,
      totalAmount: params.total_amount,
      invoicePayload: params.invoice_payload,
      shippingOptionId: params.shipping_option_id,
      orderInfo: params.order_info
    }
    if (data.orderInfo) {
      data.orderInfo = OrderInfo.fromParams(data.orderInfo, context)
    }
    return new SuccessfulPayment(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setProviderPaymentId(data.providerPaymentId)
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

  setProviderPaymentId(id) {
    this.providerPaymentId = id
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

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.providerPaymentId) {
      data.providerPaymentId = this.providerPaymentId
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
