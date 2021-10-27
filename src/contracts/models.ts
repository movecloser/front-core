/*
 * Copyright (c) 2021 Move Closer
 */

import { IIntention, Intersected, Proxable } from './support'

export interface ICollection<Type> extends Array<Type> {
  first (): Type | false
  getItem (callback: (item: Type, index?: number) => boolean): Type | false
  hasItem (callback: (item: Type, index?: number) => boolean): boolean
  hasItems (): boolean
  isEmpty (): boolean
  last (): Type | false
  meta: IMeta
}

export interface IMeta {
  [key: string]: any
}

export interface MetaPayload {
  [key: string]: any
}

export interface IModel<T> extends Proxable<T> {
  applyIntention<T, U extends object> (intention: IIntention<U>): void
  clone<T> (): T
  initialValues: ModelPayload
  get (key: string, defaultValue?: any): any
  set (property: string, value: any): void
  toObject (): T
}

export type MagicModel<Data extends object, Class extends IModel<Data> = IModel<Data>> = Intersected<Class, Data>

export interface ModelPayload {
  [key: string]: any
}

export interface ModelConstructor<Data, Class extends IModel<Data> = IModel<Data>> {
  new (payload?: ModelPayload): Class
  create<Data extends object, Class extends IModel<Data> = IModel<Data>> (payload: ModelPayload): MagicModel<Data, Class>
  hydrate<Data extends object, Class extends IModel<Data> = IModel<Data>> (payload: ModelPayload): MagicModel<Data, Class>
}

