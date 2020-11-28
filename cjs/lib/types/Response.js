const Helper = require('@darkwolf/helper.cjs')
const ResponseParameters = require('./ResponseParameters')

class Response {
  constructor(data = {}, context) {
    this
      .setContext(context)
      .setOk(data.ok)
      .setResult(data.result)
      .setErrorCode(data.errorCode)
      .setParameters(data.parameters)
      .setDescription(data.description)
  }

  setContext(context = {}) {
    this.context = context
    return this
  }

  setOk(boolean) {
    this.ok = boolean
    return this
  }

  setResult(result) {
    this.result = result
    return this
  }

  setErrorCode(code) {
    this.errorCode = code
    return this
  }

  setParameters(parameters) {
    this.parameters = parameters ? (
      parameters instanceof ResponseParameters ? parameters : new ResponseParameters(parameters)
    ) : undefined
    return this
  }

  setDescription(description) {
    this.description = description
    return this
  }

  toJSON() {
    const data = {}
    if (Helper.exists(this.ok)) {
      data.ok = this.ok
    }
    if (Helper.exists(this.result)) {
      data.result = Helper.isObject(this.result) ? (
        Array.isArray(this.result) ? this.result.map(result => result.toJSON()) : this.result.toJSON()
      ) : this.result
    }
    if (this.errorCode) {
      data.errorCode = this.errorCode
    }
    if (this.parameters) {
      data.parameters = this.parameters.toJSON()
    }
    if (Helper.exists(this.description)) {
      data.description = this.description
    }
    return data
  }
}
Response.from = (data, context) => new Response(data, context)
Response.fromParams = (params = {}, context) => {
  const data = {
    ok: params.ok,
    result: params.result,
    errorCode: params.error_code,
    parameters: params.parameters,
    description: params.description
  }
  if (data.parameters) {
    data.parameters = ResponseParameters.fromParams(data.parameters)
  }
  return new Response(data, context)
}

module.exports = Response
