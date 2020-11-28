import Helper from '@darkwolf/helper.mjs'
import Sticker from './Sticker.mjs'
import PhotoSize from './PhotoSize.mjs'

export default class StickerSet {
  static from(data, context) {
    return new StickerSet(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      name: params.name,
      title: params.title,
      animated: params.is_animated,
      containsMasks: params.contains_masks,
      stickers: params.stickers,
      thumb: params.thumb
    }
    if (data.stickers) {
      data.stickers = data.stickers.map(sticker => Sticker.fromParams(sticker, context))
    }
    if (data.thumb) {
      data.thumb = PhotoSize.fromParams(data.thumb, context)
    }
    return new StickerSet(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setName(data.name)
      .setTitle(data.title)
      .setAnimated(data.animated)
      .setContainsMasks(data.containsMasks)
      .setStickers(data.stickers)
      .setThumb(data.thumb)
  }

  get isAnimated() {
    return !!this.animated
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setName(name) {
    this.name = name
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setAnimated(boolean) {
    this.animated = boolean
    return this
  }

  setContainsMasks(boolean) {
    this.containsMasks = boolean
    return this
  }

  setStickers(stickers) {
    this.stickers = stickers ? sticker.map(sticker =>
      sticker instanceof Sticker ? sticker : new Sticker(sticker, this.context)
    ) : undefined
    return this
  }

  setThumb(thumb) {
    this.thumb = thumb ? (
      thumb instanceof PhotoSize ? thumb : new PhotoSize(thumb, this.context)
    ) : undefined
    return this
  }

  get() {
    return this.context.telegramBot.getStickerSet(this.name)
  }

  toJSON() {
    const data = {}
    if (this.name) {
      data.name = this.name
    }
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (Helper.exists(this.animated)) {
      data.animated = this.animated
    }
    if (Helper.exists(this.containsMasks)) {
      data.containsMasks = this.containsMasks
    }
    if (this.stickers) {
      data.stickers = this.stickers.map(sticker => sticker.toJSON())
    }
    if (this.thumb) {
      data.thumb = this.thumb.toJSON()
    }
    return data
  }
}
