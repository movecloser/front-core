import { createProxy } from './proxy'
import { IModel, MagicModel, ModelConstructor, ModelPayload } from '../contracts/models'
import { MissingPropertyError } from '../exceptions/errors'

/**
 * @author Kuba Fogel <kuba.foge@movecloser.pl>
 * @version 1.0.0
 */
export abstract class Model<T> implements IModel<T> {
  public initialValues: ModelPayload = {}
  protected _data: ModelPayload = {}
  protected modelProperties: string[] = []

  constructor (payload: ModelPayload = {}) {
    this.boot()

    for (const [ key, value ] of Object.entries(payload)) {
      this.__set(key, value)
    }
  }

  /**
   * Create instance of Model with Proxy involved.
   * @param payload
   */
  public static create<T extends object, M extends IModel<T> = IModel<T>> (payload: ModelPayload = {}): MagicModel<T, M> {
    return createProxy<M, T>(
      // @ts-ignore
      new this(payload)
    )
  }

  protected abstract boot (): void

  /**
   * Model property getter
   * @param property
   */
  public get (property: string): any {
    return this.__get(property)
  }

  /**
   * Method to update incomplete properties on existing model instance
   * @param payload
   */
  public static hydrate<T extends object, M extends IModel<T> = IModel<T>> (payload: ModelPayload): MagicModel<T, M> {
    // @ts-ignore
    const model: Model = new this()
    const mappedPayload: ModelPayload = {
      ...model.initialValues,
      ...payload
    }

    for (const [ key, value ] of Object.entries(mappedPayload)) {
      model.set(key, value === undefined ? model.initialValues[key] : value)
    }

    return createProxy<M, T>(model)
  }

  /**
   * Model property setter
   * @param property
   * @param value
   */
  public set (property: string, value: any): boolean {
    return this.__set(property, value)
  }

  /**
   * Method to extract raw data from model
   */
  public toObject (): T {
    return this.__toObject()
  }

  /**
   * Return value for given property due to it's accessor.
   */
  public __get (property: string): any {
    if (!(property in this._data)) {
      console.warn(`Trying to access unset property [${property}]`)
      return null
    }

    return this._data[property]
  }

  /**
   * Throws when someone trying to invoke class.
   */

  /* istanbul ignore next */
  public __invoke (...data: any): any {
    throw new Error('Model cannot be invoked.')
  }

  /**
   * Set value for given property due to additional helper mutators.
   */
  public __set (property: string, value: any): boolean {
    if (this.modelProperties.includes(property)) {
      const upperPropertyName: string = property.charAt(0).toUpperCase() + property.slice(1)
      const setterMethod: string = `set${upperPropertyName}Property`
      // @ts-ignore
      if (typeof this[setterMethod] === 'function') {
        // @ts-ignore
        this._data[property] = this[setterMethod](value)
        return true
      }

      const relatesMethod: string = `relatesTo${upperPropertyName}`
      // @ts-ignore
      if (typeof this[relatesMethod] === 'function') {
        // @ts-ignore
        this._data[property] = this[relatesMethod](value)
        return true
      }

      this._data[property] = value
    }

    return false
  }

  /**
   * Method to extract raw data from model
   */
  public __toObject (): T {
    const target: any = {
      ...this.initialValues
    }

    for (const [ key, value ] of Object.entries(this._data)) {
      // TODO: Test it.
      if (Array.isArray(value)) {
        const collection: any[] = []

        for (const element of value) {
          if (element instanceof Model) {
            collection.push(element.toObject())
          } else {
            collection.push(element)
          }
        }

        target[key] = collection
        continue
      }

      // TODO: Test it.
      if (value instanceof Model) {
        target[key] = value.toObject()
        continue
      }

      target[key] = value
    }

    return target as T
  }

  /**
   * Method to get model related to given property
   * @param model
   * @param value
   * @protected
   */
  protected hasOne<R> (model: ModelConstructor<R>, value: ModelPayload) {
    return model.hydrate(value)
  }

  /**
   * Method to get collection related to given property
   * @param model
   * @param values
   * @protected
   */
  protected hasMany<R> (model: ModelConstructor<R>, values: ModelPayload[]) {
    const collection = []

    for (const value of values) {
      collection.push(
        this.hasOne<R>(model, value)
      )
    }

    return collection
  }
}
