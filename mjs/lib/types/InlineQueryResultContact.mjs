import { InlineQueryResultType } from '../constants/index.mjs'
import InlineQueryResult from './InlineQueryResult.mjs'

export default class InlineQueryResultContact extends InlineQueryResult {
  static type = InlineQueryResultType.CONTACT

  static from(id, phoneNumber, firstName, options) {
    return new InlineQueryResultContact(id, phoneNumber, firstName, options)
  }

  constructor(id, phoneNumber, firstName, options) {
    super(InlineQueryResultContact.type, id, {
      ...options,
      phoneNumber,
      firstName
    })
  }
}
