import { BehaviorSubject } from 'rxjs'
import { injectable } from 'inversify'
import { VueConstructor } from 'vue'

export interface IModal {
  component: VueConstructor
  isOpened: boolean
  name: string|null
  payload: ModalPayload
  close (key?: string|null): void
  open (key: string, payload?: ModalPayload): void
  openAsync (key: string, promise: Promise<any>, payload?: ModalPayload): void
  subscribe (callback: (open: ModalState) => any): void
}

export interface IModalComponent {
  payload: ModalPayload
}

export interface ModalPayload {
  closable?: boolean
  [key: string]: any
}

export interface ModalRegistry {
  [key: string]: VueConstructor
}

export interface ModalState {
  component: string|null
  opened: boolean
  payload: ModalPayload
}

export const ModalType = Symbol.for('IModal')

@injectable()
export class ModalConnector {
  protected _registry!: ModalRegistry
  protected _state!: ModalState
  protected _stream$: BehaviorSubject<ModalState>

  constructor (registry: ModalRegistry) {
    this._registry = registry
    this._stream$ = new BehaviorSubject<ModalState>({
      component: null,
      opened: false,
      payload: {}
    })

    this._stream$.subscribe((state: ModalState) => {
      this._state = state
    })
  }

  close (key: string|null = null): void {
    if (key === null || !key.length || this._state.component === key) {
      this._stream$.next({
        component: null,
        opened: false,
        payload: {}
      })
    }

    this._unlockScroll()
  }

  get component (): VueConstructor {
    if (this._state.component === null) {
      throw new Error('Modal is not opened. Check if [isOpened] before calling for modal component.')
    }

    if (!this._registry.hasOwnProperty(this._state.component)) {
      throw new Error(`Unregistered modal component [${this._state.component}]`)
    }

    return this._registry[this._state.component]
  }

  get isOpened (): boolean {
    return this._state.opened && this._state.component !== null
  }

  get name (): string|null {
    return this._state.component
  }

  open (key: string, payload: ModalPayload = {}): void {
    if (!this._registry.hasOwnProperty(key)) {
      throw new Error(`Unregistered modal component [${key}]`)
    }

    this._stream$.next({
      component: key,
      opened: true,
      payload: payload
    })

    this._lockScroll()
  }

  openAsync (key: string, promise: Promise<any>, payload: ModalPayload = {}): void {
    if (!this._registry.hasOwnProperty(key)) {
      throw new Error(`Unregistered modal component [${key}]`)
    }

    promise.then(() => {
      this._stream$.next({
        component: key,
        opened: true,
        payload: payload
      })
    })
  }

  get payload (): ModalPayload {
    return this._state.payload
  }

  subscribe (callback: (open: ModalState) => any): void {
    this._stream$.subscribe((state: ModalState) => {
      callback(state)
    })
  }

  /**
   * Locks the window's scroll.
   * @private
   *
   * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
   */
  private _lockScroll (): void {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'hidden'
    }
  }

  /**
   * Unlocks the window's scroll.
   * @private
   *
   * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
   */
  private _unlockScroll (): void {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'auto'
    }
  }
}

export default ModalConnector
