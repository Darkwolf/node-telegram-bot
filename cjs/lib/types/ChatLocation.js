const Helper = require('@darkwolf/helper.cjs')
const Location = require('./Location')

class ChatLocation {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setLocation(data.location)
      .setAddress(data.address)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setLocation(location) {
    this.location = location ? (
      location instanceof Location ? location : new Location(location)
    ) : undefined
    return this
  }

  setAddress(address) {
    this.address = address
    return this
  }

  toJSON() {
    const data = {}
    if (this.location) {
      data.location = this.location.toJSON()
    }
    if (Helper.exists(this.address)) {
      data.address = this.address
    }
    return data
  }
}
ChatLocation.from = (data, context) => new ChatLocation(data, context)
ChatLocation.fromParams = (params = {}, context) => {
  const data = {
    location: params.location,
    address: params.address
  }
  if (data.location) {
    data.location = Location.fromParams(data.location)
  }
  return new ChatLocation(data, context)
}

module.exports = ChatLocation
