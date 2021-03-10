import { Intersected, Proxable } from './support'

export interface ICollection<Type> extends Array<Type>{
    first (): Type|false
    getItem (callback: (item: Type, index?: number) => boolean): Type|false
    hasItem (callback: (item: Type, index?: number) => boolean): boolean
    hasItems (): boolean
    isEmpty (): boolean
    last (): Type|false
    meta: IMeta
}

export interface IMeta {
    [key: string]: any
}

export interface MetaPayload {
    [key: string]: any
}

export interface IModel<T> extends Proxable<T> {
    initialValues: ModelPayload
    get (key: string): any
    set (property: string, value: any): void
    toObject (): T
}

export type MagicModel<MData extends object, MClass extends IModel<MData> = IModel<MData>> = Intersected<MClass, MData>

export interface ModelPayload {
    [key: string]: any
}

export interface ModelConstructor<Type> {
    new (payload?: ModelPayload): IModel<Type>
    create<Model extends object> (payload: ModelPayload): MagicModel<Model>
    hydrate<Model extends object> (payload: ModelPayload): MagicModel<Model>
}

