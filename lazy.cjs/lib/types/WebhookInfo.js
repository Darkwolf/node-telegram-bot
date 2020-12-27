const Helper = require('@darkwolf/helper.cjs')

class WebhookInfo {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setUrl(data.url)
      .setHasCustomCertificate(data.hasCustomCertificate)
      .setPendingUpdateCount(data.pendingUpdateCount)
      .setIPAddress(data.ipAddress)
      .setLastErrorDate(data.lastErrorDate)
      .setLastErrorMessage(data.lastErrorMessage)
      .setMaxConnections(data.maxConnections)
      .setAllowedUpdates(data.allowedUpdates)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setUrl(url) {
    this.url = url
    return this
  }

  setHasCustomCertificate(boolean) {
    this.hasCustomCertificate = boolean
    return this
  }

  setPendingUpdateCount(count) {
    this.pendingUpdateCount = count
    return this
  }

  setIPAddress(ipAddress) {
    this.ipAddress = ipAddress
    return this
  }

  setLastErrorDate(date) {
    this.lastErrorDate = date
    return this
  }

  setLastErrorMessage(message) {
    this.lastErrorMessage = message
    return this
  }

  setMaxConnections(value) {
    this.maxConnections = value
    return this
  }

  setAllowedUpdates(updates) {
    this.allowedUpdates = updates
    return this
  }

  get() {
    return this.context.telegramBot.getWebhookInfo()
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.url)) {
      data.url = this.url
    }
    if (Helper.exists(this.hasCustomCertificate)) {
      data.hasCustomCertificate = this.hasCustomCertificate
    }
    if (Helper.exists(this.pendingUpdateCount)) {
      data.pendingUpdateCount = this.pendingUpdateCount
    }
    if (this.ipAddress) {
      data.ipAddress = this.ipAddress
    }
    if (this.lastErrorDate) {
      data.lastErrorDate = this.lastErrorDate
    }
    if (Helper.exists(this.lastErrorMessage)) {
      data.lastErrorMessage = this.lastErrorMessage
    }
    if (this.maxConnections) {
      data.maxConnections = this.maxConnections
    }
    if (this.allowedUpdates) {
      data.allowedUpdates = this.allowedUpdates
    }
    return data
  }
}
WebhookInfo.from = (data, context) => new WebhookInfo(data, context)
WebhookInfo.fromParams = (params = {}, context) => new WebhookInfo({
  url: params.url,
  hasCustomCertificate: params.has_custom_certificate,
  pendingUpdateCount: params.pending_update_count,
  ipAddress: params.ip_address,
  lastErrorDate: params.last_error_date,
  lastErrorMessage: params.last_error_message,
  maxConnections: params.max_connections,
  allowedUpdates: params.allowed_updates
}, context)

module.exports = WebhookInfo
