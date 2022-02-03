// Copyright (c) 2021 Move Closer

/* istanbul ignore file */

// TODO: add tests and remove ignore

import { WindowService } from '../services/window'

/**
 * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 2.0.0
 * @licence MIT
 */
export class LocalStorage {
  /**
   * Resolves the value for the given key.
   * Returns 'null' if the key is not set.
   */
  static get (key: string): string | null {
    if (!WindowService.isDefined) {
      return null
    }

    return window.localStorage.getItem(key)
  }

  /**
   * Checks if the given key has ever been set.
   */
  static isSet (key: string): boolean {
    if (!WindowService.isDefined) {
      return false
    }

    return window.localStorage.getItem(key) !== null
  }

  /**
   * Removes this value the given key.
   */
  static remove (key: string): void {
    if (!WindowService.isDefined) {
      return
    }

    window.localStorage.removeItem(key)
  }

  /**
   * Sets the value for the given key.
   */
  static set (key: string, value: string): void {
    if (WindowService.isDefined) {
      window.localStorage.setItem(key, value)
    }
  }
}

export default LocalStorage
