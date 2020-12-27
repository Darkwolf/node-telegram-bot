const Helper = require('@darkwolf/helper.cjs')

class PassportElementError {
  constructor(source, type, message, options = {}) {
    this
      .setSource(source)
      .setType(type)
      .setMessage(message)
      .setFieldName(options.fieldName)
      .setDataHash(options.dataHash)
      .setFileHash(options.fileHash)
      .setFileHashes(options.fileHashes)
      .setElementHash(options.elementHash)
  }

  setSource(source) {
    this.source = source
    return this
  }

  setType(type) {
    this.type = type
    return this
  }

  setMessage(message) {
    this.message = message
    return this
  }

  setFieldName(name) {
    this.fieldName = name
    return this
  }

  setDataHash(hash) {
    this.dataHash = hash
    return this
  }

  setFileHash(hash) {
    this.fileHash = hash
    return this
  }

  setFileHashes(hashes) {
    this.fileHashes = hashes
    return this
  }

  setElementHash(hash) {
    this.elementHash = hash
    return this
  }

  toParams() {
    const params = {}
    if (this.source) {
      params.source = this.source
    }
    if (this.type) {
      params.type = this.type
    }
    if (Helper.exists(this.message)) {
      params.message = this.message
    }
    if (Helper.exists(this.fieldName)) {
      params.field_name = this.fieldName
    }
    if (this.dataHash) {
      params.data_hash = this.dataHash
    }
    if (this.fileHash) {
      params.file_hash = this.fileHash
    }
    if (this.fileHashes) {
      params.file_hashes = this.fileHashes
    }
    if (this.elementHash) {
      params.element_hash = this.elementHash
    }
    return params
  }
}
PassportElementError.from = (source, type, message, options) => new PassportElementError(source, type, message, options)

module.exports = PassportElementError
