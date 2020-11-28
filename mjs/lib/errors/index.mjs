import Error from './Error.mjs'
import UnauthorizedError from './UnauthorizedError.mjs'
import BadRequestError from './BadRequestError.mjs'
import ForbiddenError from './ForbiddenError.mjs'
import NotFoundError from './NotFoundError.mjs'
import TooManyRequestsError from './TooManyRequestsError.mjs'
import InvalidBotTokenError from './InvalidBotTokenError.mjs'
import BotBlockedByUserError from './BotBlockedByUserError.mjs'
import ChatMigratedError from './ChatMigratedError.mjs'
import InlineModeDisabledError from './InlineModeDisabledError.mjs'
import UserNotFoundError from './UserNotFoundError.mjs'
import ChatNotFoundError from './ChatNotFoundError.mjs'
import MessageNotFoundError from './MessageNotFoundError.mjs'
import ReplyMessageNotFoundError from './ReplyMessageNotFoundError.mjs'
import FileNotFoundError from './FileNotFoundError.mjs'
import StickerSetNotFoundError from './StickerSetNotFoundError.mjs'
import InvalidCallbackQueryError from './InvalidCallbackQueryError.mjs'
import InvalidInlineQueryError from './InvalidInlineQueryError.mjs'
import InvalidShippingQueryError from './InvalidShippingQueryError.mjs'
import InvalidPreCheckoutQueryError from './InvalidPreCheckoutQueryError.mjs'
import UnknownError from './UnknownError.mjs'

export {
  Error,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  InvalidBotTokenError,
  BotBlockedByUserError,
  ChatMigratedError,
  InlineModeDisabledError,
  UserNotFoundError,
  ChatNotFoundError,
  MessageNotFoundError,
  ReplyMessageNotFoundError,
  FileNotFoundError,
  StickerSetNotFoundError,
  InvalidCallbackQueryError,
  InvalidInlineQueryError,
  InvalidShippingQueryError,
  InvalidPreCheckoutQueryError,
  UnknownError
}

export default class Errors {
  static Error = Error
  static UnauthorizedError = UnauthorizedError
  static BadRequestError = BadRequestError
  static ForbiddenError = ForbiddenError
  static NotFoundError = NotFoundError
  static TooManyRequestsError = TooManyRequestsError
  static InvalidBotTokenError = InvalidBotTokenError
  static BotBlockedByUserError = BotBlockedByUserError
  static ChatMigratedError = ChatMigratedError
  static InlineModeDisabledError = InlineModeDisabledError
  static UserNotFoundError = UserNotFoundError
  static ChatNotFoundError = ChatNotFoundError
  static MessageNotFoundError = MessageNotFoundError
  static ReplyMessageNotFoundError = ReplyMessageNotFoundError
  static FileNotFoundError = FileNotFoundError
  static StickerSetNotFoundError = StickerSetNotFoundError
  static InvalidCallbackQueryError = InvalidCallbackQueryError
  static InvalidInlineQueryError = InvalidInlineQueryError
  static InvalidShippingQueryError = InvalidShippingQueryError
  static InvalidPreCheckoutQueryError = InvalidPreCheckoutQueryError
  static UnknownError = UnknownError
}
