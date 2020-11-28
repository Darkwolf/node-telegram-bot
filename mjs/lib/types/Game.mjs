import Helper from '@darkwolf/helper.mjs'
import PhotoSize from './PhotoSize.mjs'
import MessageEntity from './MessageEntity.mjs'
import Animation from './Animation.mjs'

export default class Game {
  static from(data, context) {
    return new Game(data, context)
  }

  static fromParams(params = {}, context) {
    const data = {
      title: params.title,
      description: params.description,
      photo: params.photo,
      text: params.text,
      entities: params.text_entities,
      animation: params.animation
    }
    if (data.photo) {
      data.photo = data.photo.map(photo => PhotoSize.fromParams(photo, context))
    }
    if (data.entities) {
      data.entities = data.entities.map(entity => MessageEntity.fromParams(entity, {
        ...context,
        text: data.text
      }))
    }
    if (data.animation) {
      data.animation = Animation.fromParams(data.animation, context)
    }
    return new Game(data, context)
  }

  constructor(data = {}, context) {
    this
      .setContext(context)
      .setTitle(data.title)
      .setDescription(data.description)
      .setPhoto(data.photo)
      .setText(data.text)
      .setEntities(data.entities)
      .setAnimation(data.animation)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  setPhoto(photo) {
    this.photo = photo ? photo.map(photo =>
      photo instanceof PhotoSize ? photo : new PhotoSize(photo, this.context)
    ) : undefined
    return this
  }

  setText(text) {
    this.text = text
    return this
  }

  setEntities(entities) {
    this.entities = entities ? entities.map(entity =>
      entity instanceof MessageEntity ? entity : new MessageEntity(entity, this.context)
    ) : undefined
    return this
  }

  setAnimation(animation) {
    this.animation = animation ? (
      animation instanceof Animation ? animation : new Animation(animation, this.context)
    ) : undefined
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.title)) {
      data.title = this.title
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    if (this.photo) {
      data.photo = this.photo.map(photo => photo.toJSON())
    }
    if (Helper.exists(this.text)) {
      data.text = this.text
    }
    if (this.entities) {
      data.entities = this.entities.map(entity => entity.toJSON())
    }
    if (this.animation) {
      data.animation = this.animation.toJSON()
    }
    return data
  }
}
