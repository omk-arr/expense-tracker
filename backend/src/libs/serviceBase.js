import _ from 'lodash'

/**
 * @class ServiceBase
 * @classdesc Service Base class for creating services for business logic
 * and perform some task and log them properly
 * @hideconstructor
 */
export default class ServiceBase {
  #_args = {}
  #_errors = {}
  #_success = false
  #_result = null

  constructor () {
    this.#_args = arguments[0]
    this.#_errors = {}
    this.#_success = false
    this.#_result = null
    this.#validateServiceInputs()
  }

  /** @type {object} */
  get args () {
    return this.#_args
  }

  /** @type {any} */
  get result () {
    return this.#_result
  }

  /** @type {Array} */
  get errors () {
    return this.#_errors
  }

  /** @type {boolean} */
  get success () {
    return this.#_success
  }

  /** @readonly */
  get log () {
    return {
      info: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor
        console.info(logTitle, argHash)
      },
      debug: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor
        console.debug(logTitle, argHash)
      },
      error: (logTitle, argHash = {}) => {
        argHash.klass = this.constructor
        console.error(logTitle, argHash)
      }
    }
  }

  /** @type {any} */
  set result (result) {
    this.#_result = result
    return this.#_result
  }

  /**
   *
   *
   * @param {string} attribute
   * @param {*} errorMessage
   * @return {undefined}
   */
  addError (attribute, errorMessage) {
    // check if attribute is in pascal case
    if (attribute !== _.startCase(_.camelCase(attribute)).replace(/ /g, '')) throw new Error(`${attribute} should be pascal cased in addError()`)
    const errors = this.#_errors[this.constructor.name] ||= {}
    if (!errors[attribute]) {
      _.extend(errors, { [attribute]: `${_.startCase(attribute)} ${errorMessage}` })
    } else {
      errors[attribute] = errors[attribute] instanceof Array ? errors[attribute] : [errors[attribute]]
      errors[attribute].push(`${_.startCase(attribute)} ${errorMessage}`)
    }
    console.debug('Custom Validation Failed', { klass: this.constructor, message: errorMessage, context: { attribute }, fault: this.errors })
  }

  async #tryExecuting () {
    if (this.errors.length) return

    try {
      this.#_result = await this.run()
      this.#_success = !_.size(this.errors)
    } catch (error) {
      console.error('Exception raised in Service', { klass: this.constructor, message: error.message, context: this.args, exception: error})
      throw error
    }
  }

  /**
   *
   *
   * @instance
   * @param {any[]} errors
   */
  mergeErrors (errors) {
    _.defaults(this.#_errors, errors)
  }

  async #validateServiceInputs () {
    const schema = this.constraints
    if (schema) {
      const valid = schema(this.#_args)
      if (!valid) {
        const validationErrors = schema.errors
        const errors = validationErrors.map(error => error.message)
        _.extend(this.errors, { [this.constructor.name]: { validationErrors: errors } })
        console.debug('Service input Validation Failed', { klass: this.constructor, message: 'Validation Failed', context: this.args, userCtx: this.context, fault: this.errors })
      }
    }
  }

  // STATIC METHODS
  /**
   * Throw errors while validation inputs
   */
  static async run () {
    console.info(`Service Started: ${this.name}`, { context: this.args, userCtx: this.context, wrap: 'start' })
    const args = arguments
    const instance = new this(...args)
    await instance.#tryExecuting()
    if (_.size(instance.errors)) throw instance.errors
    console.info(`Service Finished: ${this.name}`, { context: this.args, userCtx: this.context, wrap: 'end' })
    return instance.result
  }

  /**
   * Collect errors while validation inputs with a success response, decorate them later
   */
  static async execute () {
    console.info(`Service Started: ${this.name}`, { context: this.args, userCtx: this.context, wrap: 'start' })
    const args = arguments
    const instance = new this(...args)
    await instance.#tryExecuting()
    console.info(`Service Finished: ${this.name}`, { context: this.args, userCtx: this.context, wrap: 'end' })
    return instance
  }
}
