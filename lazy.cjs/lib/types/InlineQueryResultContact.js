const types = require('./')
const constants = require('../constants')

class InlineQueryResultContact extends types.InlineQueryResult {
  constructor(id, phoneNumber, firstName, options) {
    super(InlineQueryResultContact.type, id, {
      ...options,
      phoneNumber,
      firstName
    })
  }
}
InlineQueryResultContact.type = constants.InlineQueryResultType.CONTACT
InlineQueryResultContact.from = (id, phoneNumber, firstName, options) => new InlineQueryResultContact(id, phoneNumber, firstName, options)

module.exports = InlineQueryResultContact
