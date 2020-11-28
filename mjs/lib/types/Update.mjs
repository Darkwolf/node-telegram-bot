import { UpdateType } from '../constants/index.mjs'
import Message from './Message.mjs'
import InlineQuery from './InlineQuery.mjs'
import ChosenInlineResult from './ChosenInlineResult.mjs'
import CallbackQuery from './CallbackQuery.mjs'
import ShippingQuery from './ShippingQuery.mjs'
import PreCheckoutQuery from './PreCheckoutQuery.mjs'
import Poll from './Poll.mjs'
import PollAnswer from './PollAnswer.mjs'

export default class Update {
  static from(data, context) {
    return new Update(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      id: params.update_id,
      message: params.message,
      editedMessage: params.edited_message,
      channelPost: params.channel_post,
      editedChannelPost: params.edited_channel_post,
      inlineQuery: params.inline_query,
      chosenInlineResult: params.chosen_inline_result,
      callbackQuery: params.callback_query,
      shippingQuery: params.shipping_query,
      preCheckoutQuery: params.pre_checkout_query,
      poll: params.poll,
      pollAnswer: params.poll_answer
    }
    if (data.message) {
      data.type = UpdateType.MESSAGE
      data.message = Message.fromParams(data.message, context)
    } else if (data.editedMessage) {
      data.type = UpdateType.EDITED_MESSAGE
      data.editedMessage = Message.fromParams(data.editedMessage, context)
    } else if (data.channelPost) {
      data.type = UpdateType.CHANNEL_POST
      data.channelPost = Message.fromParams(data.channelPost, context)
    } else if (data.editedChannelPost) {
      data.type = UpdateType.EDITED_CHANNEL_POST
      data.editedChannelPost = Message.fromParams(data.editedChannelPost, context)
    } else if (data.inlineQuery) {
      data.type = UpdateType.INLINE_QUERY
      data.inlineQuery = InlineQuery.fromParams(data.inlineQuery, context)
    } else if (data.chosenInlineResult) {
      data.type = UpdateType.CHOSEN_INLINE_RESULT
      data.chosenInlineResult = ChosenInlineResult.fromParams(data.chosenInlineResult, context)
    } else if (data.callbackQuery) {
      data.type = UpdateType.CALLBACK_QUERY
      data.callbackQuery = CallbackQuery.fromParams(data.callbackQuery, context)
    } else if (data.shippingQuery) {
      data.type = UpdateType.SHIPPING_QUERY
      data.shippingQuery = ShippingQuery.fromParams(data.shippingQuery, context)
    } else if (data.preCheckoutQuery) {
      data.type = UpdateType.PRE_CHECKOUT_QUERY
      data.preCheckoutQuery = PreCheckoutQuery.fromParams(data.preCheckoutQuery, context)
    } else if (data.poll) {
      data.type = UpdateType.POLL
      data.poll = Poll.fromParams(data.poll, context)
    } else if (data.pollAnswer) {
      data.type = UpdateType.POLL_ANSWER
      data.pollAnswer = PollAnswer.fromParams(data.pollAnswer, context)
    }
    return new Update(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setId(data.id)
      .setType(data.type)
      .setMessage(data.message)
      .setEditedMessage(data.editedMessage)
      .setChannelPost(data.channelPost)
      .setEditedChannelPost(data.editedChannelPost)
      .setInlineQuery(data.inlineQuery)
      .setChosenInlineResult(data.chosenInlineResult)
      .setCallbackQuery(data.callbackQuery)
      .setShippingQuery(data.shippingQuery)
      .setPreCheckoutQuery(data.preCheckoutQuery)
      .setPoll(data.poll)
      .setPollAnswer(data.pollAnswer)
  }

  get isMessage() {
    return this.type === UpdateType.MESSAGE
  }

  get isEditedMessage() {
    return this.type === UpdateType.EDITED_MESSAGE
  }

  get isChannelPost() {
    return this.type === UpdateType.CHANNEL_POST
  }

  get isEditedChannelPost() {
    return this.type === UpdateType.EDITED_CHANNEL_POST
  }

  get isInlineQuery() {
    return this.type === UpdateType.INLINE_QUERY
  }

  get isChosenInlineResult() {
    return this.type === UpdateType.CHOSEN_INLINE_RESULT
  }

  get isCallbackQuery() {
    return this.type === UpdateType.CALLBACK_QUERY
  }

  get isShippingQuery() {
    return this.type === UpdateType.SHIPPING_QUERY
  }

  get isPreCheckoutQuery() {
    return this.type === UpdateType.PRE_CHECKOUT_QUERY
  }

  get isPoll() {
    return this.type === UpdateType.POLL
  }

  get isPollAnswer() {
    return this.type === UpdateType.POLL_ANSWER
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setId(id) {
    this.id = id
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setMessage(message) {
    this.message = message ? (
      message instanceof Message ? message : new Message(message, this.context)
    ) : undefined
    return this
  }

  setEditedMessage(message) {
    this.editedMessage = message ? (
      message instanceof Message ? message : new Message(message, this.context)
    ) : undefined
    return this
  }

  setChannelPost(message) {
    this.channelPost = message ? (
      message instanceof Message ? message : new Message(message, this.context)
    ) : undefined
    return this
  }

  setEditedChannelPost(message) {
    this.editedChannelPost = message ? (
      message instanceof Message ? message : new Message(message, this.context)
    ) : undefined
    return this
  }

  setInlineQuery(inlineQuery) {
    this.inlineQuery = inlineQuery ? (
      inlineQuery instanceof InlineQuery ? inlineQuery : new InlineQuery(inlineQuery, this.context)
    ) : undefined
    return this
  }

  setChosenInlineResult(chosenInlineResult) {
    this.chosenInlineResult = chosenInlineResult ? (
      chosenInlineResult instanceof ChosenInlineResult ? chosenInlineResult : new ChosenInlineResult(chosenInlineResult, this.context)
    ) : undefined
    return this
  }

  setCallbackQuery(callbackQuery) {
    this.callbackQuery = callbackQuery ? (
      callbackQuery instanceof CallbackQuery ? callbackQuery : new CallbackQuery(callbackQuery, this.context)
    ) : undefined
    return this
  }

  setShippingQuery(shippingQuery) {
    this.shippingQuery = shippingQuery ? (
      shippingQuery instanceof ShippingQuery ? shippingQuery : new ShippingQuery(shippingQuery, this.context)
    ) : undefined
    return this
  }

  setPreCheckoutQuery(preCheckoutQuery) {
    this.preCheckoutQuery = preCheckoutQuery ? (
      preCheckoutQuery instanceof PreCheckoutQuery ? preCheckoutQuery : new PreCheckoutQuery(preCheckoutQuery, this.context)
    ) : undefined
    return this
  }

  setPoll(poll) {
    this.poll = poll ? (
      poll instanceof Poll ? poll : new Poll(poll, this.context)
    ) : undefined
    return this
  }

  setPollAnswer(pollAnswer) {
    this.pollAnswer = pollAnswer ? (
      pollAnswer instanceof PollAnswer ? pollAnswer : new PollAnswer(pollAnswer, this.context)
    ) : undefined
    return this
  }

  toJSON() {
    const data = {}
    if (this.id) {
      data.id = this.id
    }
    if (this.type) {
      data.type = this.type
    }
    if (this.message) {
      data.message = this.message.toJSON()
    } else if (this.editedMessage) {
      data.editedMessage = this.editedMessage.toJSON()
    } else if (this.channelPost) {
      data.channelPost = this.channelPost.toJSON()
    } else if (this.editedChannelPost) {
      data.editedChannelPost = this.editedChannelPost.toJSON()
    } else if (this.inlineQuery) {
      data.inlineQuery = this.inlineQuery.toJSON()
    } else if (this.chosenInlineResult) {
      data.chosenInlineResult = this.chosenInlineResult.toJSON()
    } else if (this.callbackQuery) {
      data.callbackQuery = this.callbackQuery.toJSON()
    } else if (this.shippingQuery) {
      data.shippingQuery = this.shippingQuery.toJSON()
    } else if (this.preCheckoutQuery) {
      data.preCheckoutQuery = this.preCheckoutQuery.toJSON()
    } else if (this.poll) {
      data.poll = this.poll.toJSON()
    } else if (this.pollAnswer) {
      data.pollAnswer = this.pollAnswer.toJSON()
    }
    return data
  }
}
