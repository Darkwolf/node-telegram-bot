const { InlineQueryResultType } = require('../constants')
const InlineQueryResult = require('./InlineQueryResult')

class InlineQueryResultContact extends InlineQueryResult {
  constructor(id, phoneNumber, firstName, options) {
    super(InlineQueryResultContact.type, id, {
      ...options,
      phoneNumber,
      firstName
    })
  }
}
InlineQueryResultContact.type = InlineQueryResultType.CONTACT
InlineQueryResultContact.from = (id, phoneNumber, firstName, options) => new InlineQueryResultContact(id, phoneNumber, firstName, options)

module.exports = InlineQueryResultContact
