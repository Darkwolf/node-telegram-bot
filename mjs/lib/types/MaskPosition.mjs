import Helper from '@darkwolf/helper.mjs'
import { MaskPositionPoint } from '../constants/index.mjs'

export default class MaskPosition {
  static from(point, xShift, yShift, scale) {
    return new MaskPosition(point, xShift, yShift, scale)
  }

  static fromParams(params = {}) {
    return new MaskPosition(params.point, params.x_shift, params.y_shift, params.scale)
  }

  constructor(point, xShift, yShift, scale) {
    this
      .setPoint(point)
      .setXShift(xShift)
      .setYShift(yShift)
      .setScale(scale)
  }

  get isForehead() {
    return this.point === MaskPositionPoint.FOREHEAD
  }

  get isEyes() {
    return this.point === MaskPositionPoint.EYES
  }

  get isMouth() {
    return this.point === MaskPositionPoint.MOUTH
  }

  get isChin() {
    return this.point === MaskPositionPoint.CHIN
  }

  setPoint(point) {
    this.point = point
    return this
  }

  setXShift(shift) {
    this.xShift = shift
    return this
  }

  setYShift(shift) {
    this.yShift = shift
    return this
  }

  setScale(scale) {
    this.scale = scale
    return this
  }

  toParams() {
    const params = {}
    if (this.point) {
      params.point = this.point
    }
    if (Helper.exists(this.xShift)) {
      params.x_shift = this.xShift
    }
    if (Helper.exists(this.yShift)) {
      params.y_shift = this.yShift
    }
    if (Helper.exists(this.scale)) {
      params.scale = this.scale
    }
    return params
  }

  toJSON() {
    const data = {}
    if (this.point) {
      data.point = this.point
    }
    if (Helper.exists(this.xShift)) {
      data.xShift = this.xShift
    }
    if (Helper.exists(this.yShift)) {
      data.yShift = this.yShift
    }
    if (Helper.exists(this.scale)) {
      data.scale = this.scale
    }
    return data
  }
}
