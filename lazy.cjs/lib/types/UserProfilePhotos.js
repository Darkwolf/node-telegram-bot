const Helper = require('@darkwolf/helper.cjs')
const types = require('./')

class UserProfilePhotos {
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
      photo instanceof types.PhotoSize ? photo : new types.PhotoSize(photo, this.context)
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
UserProfilePhotos.from = (data, context) => new UserProfilePhotos(data, context)
UserProfilePhotos.fromParams = (params = {}, context) => {
  const data = {
    totalCount: params.total_count,
    photos: params.photos
  }
  if (data.photos) {
    data.photos = data.photos.map(photo => photo.map(photo => types.PhotoSize.fromParams(photo, context)))
  }
  return new UserProfilePhotos(data, context)
}

module.exports = UserProfilePhotos
