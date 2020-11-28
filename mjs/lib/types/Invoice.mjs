import Helper from '@darkwolf/helper.mjs'

export default class Invoice {
  static from(data, context) {
    return new Invoice(data, context)
  }

  static fromParams(params = {}, context) {
    return new Invoice({
      title: params.title,
      description: params.description,
      currency: params.currency,
      totalAmount: params.total_amount,
      startParameter: params.start_parameter
    }, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setTitle(data.title)
      .setDescription(data.description)
      .setCurrency(data.currency)
      .setTotalAmount(data.totalAmount)
      .setStartParameter(data.startParameter)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setDescription(description) {
    this.description = description
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

  setStartParameter(parameter) {
    this.startParameter = parameter
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    if (this.currency) {
      data.currency = this.currency
    }
    if (Helper.exists(this.totalAmount)) {
      data.totalAmount = this.totalAmount
    }
    if (this.startParameter) {
      data.startParameter = this.startParameter
    }
    return data
  }
}
