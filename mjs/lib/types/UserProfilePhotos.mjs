import Helper from '@darkwolf/helper.mjs'
import PhotoSize from './PhotoSize.mjs'

export default class UserProfilePhotos {
  static from(data, context) {
    return new UserProfilePhotos(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      totalCount: params.total_count,
      photos: params.photos
    }
    if (data.photos) {
      data.photos = data.photos.map(photo => photo.map(photo => PhotoSize.fromParams(photo, context)))
    }
    return new UserProfilePhotos(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setTotalCount(data.totalCount)
      .setPhotos(data.photos)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTotalCount(count) {
    this.totalCount = count
    return this
  }

  setPhotos(photos) {
    this.photos = photos ? photos.map(photo => photo.map(photo =>
      photo instanceof PhotoSize ? photo : new PhotoSize(photo, this.context)
    )) : undefined
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.totalCount)) {
      data.totalCount = this.totalCount
    }
    if (this.photos) {
      data.photos = this.photos.map(photo => photo.map(photo => photo.toJSON()))
    }
    return data
  }
}
