class Requests {}
Object.defineProperty(Requests, 'GetUpdatesRequest', {
  get: () => {
    if (!Requests._GetUpdatesRequest) {
      Requests._GetUpdatesRequest = require('./GetUpdatesRequest')
    }
    return Requests._GetUpdatesRequest
  }
})
Object.defineProperty(Requests, 'SetWebhookRequest', {
  get: () => {
    if (!Requests._SetWebhookRequest) {
      Requests._SetWebhookRequest = require('./SetWebhookRequest')
    }
    return Requests._SetWebhookRequest
  }
})
Object.defineProperty(Requests, 'DeleteWebhookRequest', {
  get: () => {
    if (!Requests._DeleteWebhookRequest) {
      Requests._DeleteWebhookRequest = require('./DeleteWebhookRequest')
    }
    return Requests._DeleteWebhookRequest
  }
})
Object.defineProperty(Requests, 'GetWebhookInfoRequest', {
  get: () => {
    if (!Requests._GetWebhookInfoRequest) {
      Requests._GetWebhookInfoRequest = require('./GetWebhookInfoRequest')
    }
    return Requests._GetWebhookInfoRequest
  }
})
Object.defineProperty(Requests, 'GetMeRequest', {
  get: () => {
    if (!Requests._GetMeRequest) {
      Requests._GetMeRequest = require('./GetMeRequest')
    }
    return Requests._GetMeRequest
  }
})
Object.defineProperty(Requests, 'LogOutRequest', {
  get: () => {
    if (!Requests._LogOutRequest) {
      Requests._LogOutRequest = require('./LogOutRequest')
    }
    return Requests._LogOutRequest
  }
})
Object.defineProperty(Requests, 'CloseRequest', {
  get: () => {
    if (!Requests._CloseRequest) {
      Requests._CloseRequest = require('./CloseRequest')
    }
    return Requests._CloseRequest
  }
})
Object.defineProperty(Requests, 'SendMessageRequest', {
  get: () => {
    if (!Requests._SendMessageRequest) {
      Requests._SendMessageRequest = require('./SendMessageRequest')
    }
    return Requests._SendMessageRequest
  }
})
Object.defineProperty(Requests, 'ForwardMessageRequest', {
  get: () => {
    if (!Requests._ForwardMessageRequest) {
      Requests._ForwardMessageRequest = require('./ForwardMessageRequest')
    }
    return Requests._ForwardMessageRequest
  }
})
Object.defineProperty(Requests, 'CopyMessageRequest', {
  get: () => {
    if (!Requests._CopyMessageRequest) {
      Requests._CopyMessageRequest = require('./CopyMessageRequest')
    }
    return Requests._CopyMessageRequest
  }
})
Object.defineProperty(Requests, 'SendPhotoRequest', {
  get: () => {
    if (!Requests._SendPhotoRequest) {
      Requests._SendPhotoRequest = require('./SendPhotoRequest')
    }
    return Requests._SendPhotoRequest
  }
})
Object.defineProperty(Requests, 'SendAudioRequest', {
  get: () => {
    if (!Requests._SendAudioRequest) {
      Requests._SendAudioRequest = require('./SendAudioRequest')
    }
    return Requests._SendAudioRequest
  }
})
Object.defineProperty(Requests, 'SendDocumentRequest', {
  get: () => {
    if (!Requests._SendDocumentRequest) {
      Requests._SendDocumentRequest = require('./SendDocumentRequest')
    }
    return Requests._SendDocumentRequest
  }
})
Object.defineProperty(Requests, 'SendVideoRequest', {
  get: () => {
    if (!Requests._SendVideoRequest) {
      Requests._SendVideoRequest = require('./SendVideoRequest')
    }
    return Requests._SendVideoRequest
  }
})
Object.defineProperty(Requests, 'SendAnimationRequest', {
  get: () => {
    if (!Requests._SendAnimationRequest) {
      Requests._SendAnimationRequest = require('./SendAnimationRequest')
    }
    return Requests._SendAnimationRequest
  }
})
Object.defineProperty(Requests, 'SendVoiceRequest', {
  get: () => {
    if (!Requests._SendVoiceRequest) {
      Requests._SendVoiceRequest = require('./SendVoiceRequest')
    }
    return Requests._SendVoiceRequest
  }
})
Object.defineProperty(Requests, 'SendVideoNoteRequest', {
  get: () => {
    if (!Requests._SendVideoNoteRequest) {
      Requests._SendVideoNoteRequest = require('./SendVideoNoteRequest')
    }
    return Requests._SendVideoNoteRequest
  }
})
Object.defineProperty(Requests, 'SendMediaGroupRequest', {
  get: () => {
    if (!Requests._SendMediaGroupRequest) {
      Requests._SendMediaGroupRequest = require('./SendMediaGroupRequest')
    }
    return Requests._SendMediaGroupRequest
  }
})
Object.defineProperty(Requests, 'SendLocationRequest', {
  get: () => {
    if (!Requests._SendLocationRequest) {
      Requests._SendLocationRequest = require('./SendLocationRequest')
    }
    return Requests._SendLocationRequest
  }
})
Object.defineProperty(Requests, 'EditMessageLiveLocationRequest', {
  get: () => {
    if (!Requests._EditMessageLiveLocationRequest) {
      Requests._EditMessageLiveLocationRequest = require('./EditMessageLiveLocationRequest')
    }
    return Requests._EditMessageLiveLocationRequest
  }
})
Object.defineProperty(Requests, 'StopMessageLiveLocationRequest', {
  get: () => {
    if (!Requests._StopMessageLiveLocationRequest) {
      Requests._StopMessageLiveLocationRequest = require('./StopMessageLiveLocationRequest')
    }
    return Requests._StopMessageLiveLocationRequest
  }
})
Object.defineProperty(Requests, 'SendVenueRequest', {
  get: () => {
    if (!Requests._SendVenueRequest) {
      Requests._SendVenueRequest = require('./SendVenueRequest')
    }
    return Requests._SendVenueRequest
  }
})
Object.defineProperty(Requests, 'SendContactRequest', {
  get: () => {
    if (!Requests._SendContactRequest) {
      Requests._SendContactRequest = require('./SendContactRequest')
    }
    return Requests._SendContactRequest
  }
})
Object.defineProperty(Requests, 'SendPollRequest', {
  get: () => {
    if (!Requests._SendPollRequest) {
      Requests._SendPollRequest = require('./SendPollRequest')
    }
    return Requests._SendPollRequest
  }
})
Object.defineProperty(Requests, 'SendDiceRequest', {
  get: () => {
    if (!Requests._SendDiceRequest) {
      Requests._SendDiceRequest = require('./SendDiceRequest')
    }
    return Requests._SendDiceRequest
  }
})
Object.defineProperty(Requests, 'SendChatActionRequest', {
  get: () => {
    if (!Requests._SendChatActionRequest) {
      Requests._SendChatActionRequest = require('./SendChatActionRequest')
    }
    return Requests._SendChatActionRequest
  }
})
Object.defineProperty(Requests, 'GetUserProfilePhotosRequest', {
  get: () => {
    if (!Requests._GetUserProfilePhotosRequest) {
      Requests._GetUserProfilePhotosRequest = require('./GetUserProfilePhotosRequest')
    }
    return Requests._GetUserProfilePhotosRequest
  }
})
Object.defineProperty(Requests, 'GetFileRequest', {
  get: () => {
    if (!Requests._GetFileRequest) {
      Requests._GetFileRequest = require('./GetFileRequest')
    }
    return Requests._GetFileRequest
  }
})
Object.defineProperty(Requests, 'DownloadFileByPathRequest', {
  get: () => {
    if (!Requests._DownloadFileByPathRequest) {
      Requests._DownloadFileByPathRequest = require('./DownloadFileByPathRequest')
    }
    return Requests._DownloadFileByPathRequest
  }
})
Object.defineProperty(Requests, 'KickChatMemberRequest', {
  get: () => {
    if (!Requests._KickChatMemberRequest) {
      Requests._KickChatMemberRequest = require('./KickChatMemberRequest')
    }
    return Requests._KickChatMemberRequest
  }
})
Object.defineProperty(Requests, 'UnbanChatMemberRequest', {
  get: () => {
    if (!Requests._UnbanChatMemberRequest) {
      Requests._UnbanChatMemberRequest = require('./UnbanChatMemberRequest')
    }
    return Requests._UnbanChatMemberRequest
  }
})
Object.defineProperty(Requests, 'RestrictChatMemberRequest', {
  get: () => {
    if (!Requests._RestrictChatMemberRequest) {
      Requests._RestrictChatMemberRequest = require('./RestrictChatMemberRequest')
    }
    return Requests._RestrictChatMemberRequest
  }
})
Object.defineProperty(Requests, 'PromoteChatMemberRequest', {
  get: () => {
    if (!Requests._PromoteChatMemberRequest) {
      Requests._PromoteChatMemberRequest = require('./PromoteChatMemberRequest')
    }
    return Requests._PromoteChatMemberRequest
  }
})
Object.defineProperty(Requests, 'SetChatAdminCustomTitleRequest', {
  get: () => {
    if (!Requests._SetChatAdminCustomTitleRequest) {
      Requests._SetChatAdminCustomTitleRequest = require('./SetChatAdminCustomTitleRequest')
    }
    return Requests._SetChatAdminCustomTitleRequest
  }
})
Object.defineProperty(Requests, 'SetChatPermissionsRequest', {
  get: () => {
    if (!Requests._SetChatPermissionsRequest) {
      Requests._SetChatPermissionsRequest = require('./SetChatPermissionsRequest')
    }
    return Requests._SetChatPermissionsRequest
  }
})
Object.defineProperty(Requests, 'ExportChatInviteLinkRequest', {
  get: () => {
    if (!Requests._ExportChatInviteLinkRequest) {
      Requests._ExportChatInviteLinkRequest = require('./ExportChatInviteLinkRequest')
    }
    return Requests._ExportChatInviteLinkRequest
  }
})
Object.defineProperty(Requests, 'SetChatPhotoRequest', {
  get: () => {
    if (!Requests._SetChatPhotoRequest) {
      Requests._SetChatPhotoRequest = require('./SetChatPhotoRequest')
    }
    return Requests._SetChatPhotoRequest
  }
})
Object.defineProperty(Requests, 'DeleteChatPhotoRequest', {
  get: () => {
    if (!Requests._DeleteChatPhotoRequest) {
      Requests._DeleteChatPhotoRequest = require('./DeleteChatPhotoRequest')
    }
    return Requests._DeleteChatPhotoRequest
  }
})
Object.defineProperty(Requests, 'SetChatTitleRequest', {
  get: () => {
    if (!Requests._SetChatTitleRequest) {
      Requests._SetChatTitleRequest = require('./SetChatTitleRequest')
    }
    return Requests._SetChatTitleRequest
  }
})
Object.defineProperty(Requests, 'SetChatDescriptionRequest', {
  get: () => {
    if (!Requests._SetChatDescriptionRequest) {
      Requests._SetChatDescriptionRequest = require('./SetChatDescriptionRequest')
    }
    return Requests._SetChatDescriptionRequest
  }
})
Object.defineProperty(Requests, 'PinChatMessageRequest', {
  get: () => {
    if (!Requests._PinChatMessageRequest) {
      Requests._PinChatMessageRequest = require('./PinChatMessageRequest')
    }
    return Requests._PinChatMessageRequest
  }
})
Object.defineProperty(Requests, 'UnpinChatMessageRequest', {
  get: () => {
    if (!Requests._UnpinChatMessageRequest) {
      Requests._UnpinChatMessageRequest = require('./UnpinChatMessageRequest')
    }
    return Requests._UnpinChatMessageRequest
  }
})
Object.defineProperty(Requests, 'UnpinAllChatMessagesRequest', {
  get: () => {
    if (!Requests._UnpinAllChatMessagesRequest) {
      Requests._UnpinAllChatMessagesRequest = require('./UnpinAllChatMessagesRequest')
    }
    return Requests._UnpinAllChatMessagesRequest
  }
})
Object.defineProperty(Requests, 'LeaveChatRequest', {
  get: () => {
    if (!Requests._LeaveChatRequest) {
      Requests._LeaveChatRequest = require('./LeaveChatRequest')
    }
    return Requests._LeaveChatRequest
  }
})
Object.defineProperty(Requests, 'GetChatRequest', {
  get: () => {
    if (!Requests._GetChatRequest) {
      Requests._GetChatRequest = require('./GetChatRequest')
    }
    return Requests._GetChatRequest
  }
})
Object.defineProperty(Requests, 'GetChatAdminsRequest', {
  get: () => {
    if (!Requests._GetChatAdminsRequest) {
      Requests._GetChatAdminsRequest = require('./GetChatAdminsRequest')
    }
    return Requests._GetChatAdminsRequest
  }
})
Object.defineProperty(Requests, 'GetChatMembersCountRequest', {
  get: () => {
    if (!Requests._GetChatMembersCountRequest) {
      Requests._GetChatMembersCountRequest = require('./GetChatMembersCountRequest')
    }
    return Requests._GetChatMembersCountRequest
  }
})
Object.defineProperty(Requests, 'GetChatMemberRequest', {
  get: () => {
    if (!Requests._GetChatMemberRequest) {
      Requests._GetChatMemberRequest = require('./GetChatMemberRequest')
    }
    return Requests._GetChatMemberRequest
  }
})
Object.defineProperty(Requests, 'SetChatStickerSetRequest', {
  get: () => {
    if (!Requests._SetChatStickerSetRequest) {
      Requests._SetChatStickerSetRequest = require('./SetChatStickerSetRequest')
    }
    return Requests._SetChatStickerSetRequest
  }
})
Object.defineProperty(Requests, 'DeleteChatStickerSetRequest', {
  get: () => {
    if (!Requests._DeleteChatStickerSetRequest) {
      Requests._DeleteChatStickerSetRequest = require('./DeleteChatStickerSetRequest')
    }
    return Requests._DeleteChatStickerSetRequest
  }
})
Object.defineProperty(Requests, 'AnswerCallbackQueryRequest', {
  get: () => {
    if (!Requests._AnswerCallbackQueryRequest) {
      Requests._AnswerCallbackQueryRequest = require('./AnswerCallbackQueryRequest')
    }
    return Requests._AnswerCallbackQueryRequest
  }
})
Object.defineProperty(Requests, 'SetMyCommandsRequest', {
  get: () => {
    if (!Requests._SetMyCommandsRequest) {
      Requests._SetMyCommandsRequest = require('./SetMyCommandsRequest')
    }
    return Requests._SetMyCommandsRequest
  }
})
Object.defineProperty(Requests, 'GetMyCommandsRequest', {
  get: () => {
    if (!Requests._GetMyCommandsRequest) {
      Requests._GetMyCommandsRequest = require('./GetMyCommandsRequest')
    }
    return Requests._GetMyCommandsRequest
  }
})
Object.defineProperty(Requests, 'EditMessageTextRequest', {
  get: () => {
    if (!Requests._EditMessageTextRequest) {
      Requests._EditMessageTextRequest = require('./EditMessageTextRequest')
    }
    return Requests._EditMessageTextRequest
  }
})
Object.defineProperty(Requests, 'EditMessageCaptionRequest', {
  get: () => {
    if (!Requests._EditMessageCaptionRequest) {
      Requests._EditMessageCaptionRequest = require('./EditMessageCaptionRequest')
    }
    return Requests._EditMessageCaptionRequest
  }
})
Object.defineProperty(Requests, 'EditMessageMediaRequest', {
  get: () => {
    if (!Requests._EditMessageMediaRequest) {
      Requests._EditMessageMediaRequest = require('./EditMessageMediaRequest')
    }
    return Requests._EditMessageMediaRequest
  }
})
Object.defineProperty(Requests, 'EditMessageReplyMarkupRequest', {
  get: () => {
    if (!Requests._EditMessageReplyMarkupRequest) {
      Requests._EditMessageReplyMarkupRequest = require('./EditMessageReplyMarkupRequest')
    }
    return Requests._EditMessageReplyMarkupRequest
  }
})
Object.defineProperty(Requests, 'StopPollRequest', {
  get: () => {
    if (!Requests._StopPollRequest) {
      Requests._StopPollRequest = require('./StopPollRequest')
    }
    return Requests._StopPollRequest
  }
})
Object.defineProperty(Requests, 'DeleteMessageRequest', {
  get: () => {
    if (!Requests._DeleteMessageRequest) {
      Requests._DeleteMessageRequest = require('./DeleteMessageRequest')
    }
    return Requests._DeleteMessageRequest
  }
})
Object.defineProperty(Requests, 'SendStickerRequest', {
  get: () => {
    if (!Requests._SendStickerRequest) {
      Requests._SendStickerRequest = require('./SendStickerRequest')
    }
    return Requests._SendStickerRequest
  }
})
Object.defineProperty(Requests, 'GetStickerSetRequest', {
  get: () => {
    if (!Requests._GetStickerSetRequest) {
      Requests._GetStickerSetRequest = require('./GetStickerSetRequest')
    }
    return Requests._GetStickerSetRequest
  }
})
Object.defineProperty(Requests, 'UploadStickerFileRequest', {
  get: () => {
    if (!Requests._UploadStickerFileRequest) {
      Requests._UploadStickerFileRequest = require('./UploadStickerFileRequest')
    }
    return Requests._UploadStickerFileRequest
  }
})
Object.defineProperty(Requests, 'CreateNewStickerSetRequest', {
  get: () => {
    if (!Requests._CreateNewStickerSetRequest) {
      Requests._CreateNewStickerSetRequest = require('./CreateNewStickerSetRequest')
    }
    return Requests._CreateNewStickerSetRequest
  }
})
Object.defineProperty(Requests, 'AddStickerToSetRequest', {
  get: () => {
    if (!Requests._AddStickerToSetRequest) {
      Requests._AddStickerToSetRequest = require('./AddStickerToSetRequest')
    }
    return Requests._AddStickerToSetRequest
  }
})
Object.defineProperty(Requests, 'SetStickerPositionInSetRequest', {
  get: () => {
    if (!Requests._SetStickerPositionInSetRequest) {
      Requests._SetStickerPositionInSetRequest = require('./SetStickerPositionInSetRequest')
    }
    return Requests._SetStickerPositionInSetRequest
  }
})
Object.defineProperty(Requests, 'DeleteStickerFromSetRequest', {
  get: () => {
    if (!Requests._DeleteStickerFromSetRequest) {
      Requests._DeleteStickerFromSetRequest = require('./DeleteStickerFromSetRequest')
    }
    return Requests._DeleteStickerFromSetRequest
  }
})
Object.defineProperty(Requests, 'SetStickerSetThumbRequest', {
  get: () => {
    if (!Requests._SetStickerSetThumbRequest) {
      Requests._SetStickerSetThumbRequest = require('./SetStickerSetThumbRequest')
    }
    return Requests._SetStickerSetThumbRequest
  }
})
Object.defineProperty(Requests, 'AnswerInlineQueryRequest', {
  get: () => {
    if (!Requests._AnswerInlineQueryRequest) {
      Requests._AnswerInlineQueryRequest = require('./AnswerInlineQueryRequest')
    }
    return Requests._AnswerInlineQueryRequest
  }
})
Object.defineProperty(Requests, 'SendInvoiceRequest', {
  get: () => {
    if (!Requests._SendInvoiceRequest) {
      Requests._SendInvoiceRequest = require('./SendInvoiceRequest')
    }
    return Requests._SendInvoiceRequest
  }
})
Object.defineProperty(Requests, 'AnswerShippingQueryRequest', {
  get: () => {
    if (!Requests._AnswerShippingQueryRequest) {
      Requests._AnswerShippingQueryRequest = require('./AnswerShippingQueryRequest')
    }
    return Requests._AnswerShippingQueryRequest
  }
})
Object.defineProperty(Requests, 'AnswerPreCheckoutQueryRequest', {
  get: () => {
    if (!Requests._AnswerPreCheckoutQueryRequest) {
      Requests._AnswerPreCheckoutQueryRequest = require('./AnswerPreCheckoutQueryRequest')
    }
    return Requests._AnswerPreCheckoutQueryRequest
  }
})
Object.defineProperty(Requests, 'SetPassportDataErrorsRequest', {
  get: () => {
    if (!Requests._SetPassportDataErrorsRequest) {
      Requests._SetPassportDataErrorsRequest = require('./SetPassportDataErrorsRequest')
    }
    return Requests._SetPassportDataErrorsRequest
  }
})
Object.defineProperty(Requests, 'SendGameRequest', {
  get: () => {
    if (!Requests._SendGameRequest) {
      Requests._SendGameRequest = require('./SendGameRequest')
    }
    return Requests._SendGameRequest
  }
})
Object.defineProperty(Requests, 'SetGameScoreRequest', {
  get: () => {
    if (!Requests._SetGameScoreRequest) {
      Requests._SetGameScoreRequest = require('./SetGameScoreRequest')
    }
    return Requests._SetGameScoreRequest
  }
})
Object.defineProperty(Requests, 'GetGameHighScoresRequest', {
  get: () => {
    if (!Requests._GetGameHighScoresRequest) {
      Requests._GetGameHighScoresRequest = require('./GetGameHighScoresRequest')
    }
    return Requests._GetGameHighScoresRequest
  }
})

module.exports = Requests
