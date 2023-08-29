// Copyright (c) 2021 Move Closer

import { AnyObject, ILocalStorage } from '../../contracts'
import { Injectable } from '../../container'
import { LocalStorage } from '../../support'

@Injectable()
export class NativeLocalStorageProvider implements ILocalStorage {
  constructor (private _config?: AnyObject) {

  }

  get (key: string): string | null {
    return LocalStorage.get(key)
  }

  isSet (key: string): boolean {
    return LocalStorage.isSet(key)
  }

  remove (key: string): void  {
    return LocalStorage.remove(key)
  }

  set (key: string, value: string): void {
    return LocalStorage.set(key, value)
  }
}
