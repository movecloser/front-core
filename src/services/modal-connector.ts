import { BehaviorSubject } from 'rxjs'
import { IModal, ModalPayload, ModalRegistry, ModalState } from '../contracts'
import { Injectable } from '../container'

@Injectable()
export class ModalConnector implements IModal{
  protected _registry!: ModalRegistry<any>
  protected _state!: ModalState
  protected _stream$: BehaviorSubject<ModalState>

  constructor (registry: ModalRegistry<any>) {
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

  /**
   *
   * @param key
   */
  public close (key: string|null = null): void {
    if (key === null || !key.length || this._state.component === key) {
      this._stream$.next({
        component: null,
        opened: false,
        payload: {}
      })
    }

    this._unlockScroll()
  }

  /**
   *
   */
  public component<C> (): C  {
    if (this._state.component === null) {
      throw new Error('Modal is not opened. Check if [isOpened] before calling for modal component.')
    }

    if (!this._registry.hasOwnProperty(this._state.component)) {
      throw new Error(`Unregistered modal component [${this._state.component}]`)
    }

    return this._registry[this._state.component]
  }

  /**
   *
   */
  public get isOpened (): boolean {
    return this._state.opened && this._state.component !== null
  }

  /**
   *
   */
  public get name (): string|null {
    return this._state.component
  }

  /**
   *
   * @param key
   * @param payload
   */
  public open (key: string, payload: ModalPayload = {}): void {
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

  /**
   *
   * @param key
   * @param promise
   * @param payload
   */
   public openAsync (key: string, promise: Promise<any>, payload: ModalPayload = {}): void {
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

  /**
   *
   */
  public get payload (): ModalPayload {
    return this._state.payload
  }

  /**
   *
   * @param callback
   */
  public subscribe (callback: (open: ModalState) => any): void {
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
