export interface IIntention<T> {
  toModel: () => T,
  toRequest: () => any
}

export type MappingConfig = {
  [key: string]: MappingInstruction | string
}

interface MappingDriver {
  value?: MappingFunction | string
  map?: MappingConfig
  target?: string
}

export type MappingFunction = (toMap: any) => any

export interface MappingInstruction extends MappingDriver {
  type: MappingTypes
}

export enum MappingTypes {
  Adapter = 'adapter',
  Function = 'function'
}
