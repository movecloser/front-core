/**
 * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
 */

export const localStorage = {

  /**
   * Resolves the value for the given key.
   * Returns 'null' if the key is not set.
   * @param key - The key which value is to be resolved.
   */
  get (key: string): string | null {
    if (typeof window === 'undefined') {
      return null
    }

    return window.localStorage.getItem(key)
  },

  /**
   * Checks if the given key has ever been set.
   * @param key - The key that is to be checked.
   */
  isSet (key: string): boolean {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem(key) !== null
  },

  /**
   * Sets the value for the given key.
   * @param key - The key that is to be modified.
   * @param value - The target value for the key.
   */
  set (key: string, value: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
  }
}

export default localStorage
