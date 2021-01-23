import { WindowService } from '@/services/window'

/**
 * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export class LocalStorage {
  /**
   * Resolves the value for the given key.
   * Returns 'null' if the key is not set.
   */
  get (key: string): string | null {
    if (!WindowService.isDefined) {
      return null
    }

    return window.localStorage.getItem(key)
  }

  /**
   * Checks if the given key has ever been set.
   */
  isSet (key: string): boolean {
    if (!WindowService.isDefined) {
      return false
    }

    return window.localStorage.getItem(key) !== null
  }

  /**
   * Removes this value the given key.
   */
  remove (key: string): void {
    if (!WindowService.isDefined) {
      return
    }

    window.localStorage.removeItem(key)
  }

  /**
   * Sets the value for the given key.
   */
  set (key: string, value: string): void {
    if (WindowService.isDefined) {
      window.localStorage.setItem(key, value)
    }
  }
}

export default LocalStorage
