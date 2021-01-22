export interface ICollection<T> {
    first (): T|false
    getItem (callback: (item: T, index?: number) => boolean): T|false
    hasItem (callback: (item: T, index?: number) => boolean): boolean
    hasItems (): boolean
    isEmpty (): boolean
    last (): T|false
}

export interface IMeta {
    [key: string]: any
}

export interface MetaPayload {
    [key: string]: any
}

export interface IModel<T> {
    initialValues: ModelPayload
    get (key: string): any
    set (property: string, value: any): void
    toObject (): ModelPayload
}

export interface ModelPayload {
    [key: string]: any
}

export interface ModelConstructor<T> {
    new (payload?: ModelPayload): IModel<T>
    hydrate (payload: ModelPayload): IModel<T>
}


