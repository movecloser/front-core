import { mapIntention, MappingConfig } from '@/support/adapter'

export interface IIntention<T> {
  toModel: () => T,
  toRequest: () => any
}

export abstract class AbstractIntention<T> implements IIntention<T>{
  protected abstract map: MappingConfig

  protected payload!: T

  constructor (payload: T) {
    this.payload = payload
  }

  public toModel (): T {
    return this.payload
  }

  public toRequest (): any {
    return mapIntention<any>(this.payload, this.map)
  }
}
