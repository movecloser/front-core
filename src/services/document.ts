import { IDocument } from '../contracts/services'

import { Injectable } from '../container'
import { WindowService } from './window'

/**
 * Provides window object access and functionalities.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
@Injectable()
export class DocumentService implements IDocument {
  /**
   * Determine if window object is available (Client vs SSR).
   *
   * @var boolean
   */
  private _isDefined: boolean = true

  constructor () {
    if (!WindowService.isDefined) {
      this._isDefined = false
    }
  }

  /**
   * Add listener to document object (if defined)
   *
   * @return void
   */
  addEventListener (name: any, handler: (this: Document, ev: any) => any, options?: any): void {
    if (this._isDefined) {
      document.addEventListener(name, handler, options)
    }
  }

  /**
   * Call method in parent object based on name.
   *
   * @param {String} method
   * @param {Array} params
   * @return any
   */
  call (method: string, params: any[]): any {
    if (this._isDefined) {
      try {
        // @ts-ignore
        return document[method](...params)
      } catch (error) {
        throw new Error(error)
      }
    }

    return null
  }

  /**
   * Removes listener from document object (if defined)
   *
   * @return void
   */
  removeEventListener (name: any, handler: (this: Document, ev: any) => any, options?: any): void {
    if (this._isDefined) {
      document.removeEventListener(name, handler, options)
    }
  }
}
