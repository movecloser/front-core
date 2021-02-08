import { Moment } from 'moment'
import { Observable } from 'rxjs'

export const DateTimeType = Symbol.for('IDateTime')
export const DocumentType = Symbol.for('IDocument')

export interface IDateTime {
  difference (start: string, end?: string): number
  now: Moment
  nowToFormat (format: string): string
  parse (date: string): Moment
  parseToFormat (date: string, format: string): string
}

export interface IDocument {
  addEventListener (name: any, handler: (this: Document, ev: any) => any, options?: any): void
  call (method: string, params: object): any
  removeEventListener (name: any, handler: (this: Document, ev: any) => any, options?: any): void
}

export interface IModal {
  component <C> (): C
  getComponent<C> (name: string): C
  getRegistry<C> (): ModalRegistry<C>
  isOpened: boolean
  name: string|null
  payload: ModalPayload
  close (key?: string|null): void
  open<Payload> (key: string, payload?: (Payload extends ModalPayload ? ModalPayload : any), config?: ModalConfig): void
  openAsync<Payload> (key: string, promise: Promise<any>, payload?: (Payload extends ModalPayload ? ModalPayload : any), config?: ModalConfig): void
  subscribe (callback: (open: ModalState) => any): void
}

export interface ModalConfig {
  [key: string]: any
}

export interface ModalPayload {
  [key: string]: any
}

export interface ModalRegistry<ComponentConstructor> {
  [key: string]: ComponentConstructor
}

export interface ModalState {
  component: string|null
  opened: boolean
  payload: ModalPayload
  config: ModalConfig
}

export const ModalType = Symbol.for('IModal')

export interface IWindow {
  addEventListener (name: any, handler: (this: Window, ev: any) => any, options?: any): void

  call: (method: string, params: any[]) => any
  document: IDocument
  isClient: boolean
  isDesktop: boolean
  isMobile: boolean
  isPhone: boolean
  isServer: boolean
  isTablet: boolean
  native: Window | null

  scrollTo(options?: ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
  redirect (target: string): void

  removeEventListener (name: any, handler: (this: Window, ev: any) => any, options?: any): void
}

export interface IStreamBus {
  get (stream: string): Observable<any>
  register (stream: string, factory: StreamFactory, force?: boolean): boolean
  unregister (stream: string): boolean
}

export const StreamBusType = Symbol.for('IStreamBus')

export type StreamFactory = () => Observable<any>

export interface StreamList {
  [key: string]: StreamFactory
}

export interface StreamRegistry {
  [key: string]: Observable<any>
}

export const WindowType = Symbol.for('IWindow')
