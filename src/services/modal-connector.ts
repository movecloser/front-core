import { BehaviorSubject } from 'rxjs'
import { IModal, ModalConfig, ModalPayload, ModalRegistry, ModalState } from '../contracts'
import { Injectable } from '../container'

@Injectable()
export class ModalConnector implements IModal{
  protected _defaultConfig!: ModalConfig
  protected _registry!: ModalRegistry<any>
  protected _state!: ModalState
  protected _stream$: BehaviorSubject<ModalState>

  constructor (registry: ModalRegistry<any>, defaultConfig = {}) {
    this._registry = registry
    this._defaultConfig = defaultConfig
    this._stream$ = new BehaviorSubject<ModalState>({
      component: null,
      opened: false,
      payload: {},
      config: {}
    })

    this._stream$.subscribe((state: ModalState) => {
      this._state = state
    })
  }

  /**
   * Method to trigger closing of a modal.
   * @param key
   */
  public close (key: string|null = null): void {
    if (key === null || !key.length || this._state.component === key) {
      this._stream$.next({
        component: null,
        opened: false,
        payload: {},
        config: {}
      })
    }

    this.unlockScroll()
  }

  /**
   * Returns current component from state.
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
   * Resolve component from registry by it's name.
   * @param name
   */
  public getComponent<C> (name: string): C {
    if (!this._registry.hasOwnProperty(name)) {
      throw new Error(`Unregistered modal component [${name}]`)
    }

    return this._registry[name]
  }

  /**
   * Returns boolean if modal is currently opened.
   */
  public get isOpened (): boolean {
    return this._state.opened && this._state.component !== null
  }

  /**
   * Returns name of current modal component.
   */
  public get name (): string|null {
    return this._state.component
  }

  /**
   * Returns array of registered components.
   */
  public getRegistry<C> (): ModalRegistry<C> {
    return this._registry
  }

  /**
   * Method to trigger modal opening.
   * @param key
   * @param payload
   * @param config
   */
  public open<Payload> (key: string, payload: Payload = {} as any, config: ModalConfig = {}): void {
    if (!this._registry.hasOwnProperty(key)) {
      throw new Error(`Unregistered modal component [${key}]`)
    }

    this._stream$.next({
      component: key,
      opened: true,
      payload,
      config: Object.assign(this._defaultConfig, config)
    })

    this.lockScroll()
  }

  /**
   * Method to asynchronously trigger modals opening.
   * @param key
   * @param promise
   * @param payload
   * @param config
   */
   public openAsync<Payload> (key: string, promise: Promise<any>, payload: Payload = {} as any, config: ModalConfig = {}): void {
    if (!this._registry.hasOwnProperty(key)) {
      throw new Error(`Unregistered modal component [${key}]`)
    }

    promise.then(() => {
      this._stream$.next({
        component: key,
        opened: true,
        payload,
        config: Object.assign(this._defaultConfig, config)
      })
    })
  }

  /**
   * Returns payload of currently opened modal.
   */
  public get payload (): ModalPayload {
    return this._state.payload
  }

  /**
   * Method to subscribe for modals stream.
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
  private lockScroll (): void {
    /* istanbul ignore else */
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
  private unlockScroll (): void {
    /* istanbul ignore else */
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'auto'
    }
  }
}

export default ModalConnector
