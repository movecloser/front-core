export interface Filters {
  [key: string]: string|number
}

export interface FiltersConfig {
  [key: string]: string|number|boolean|FilterParams|FilterParams[]
}

export interface FilterParams {
  conjunction?: ConjunctionOperator
  operator: FilterOperator
  value: string|number|boolean
}

export enum FilterOperator {
  Like = 'lk',
  Equal = 'eq',
  LessThan = 'lt',
  LessEqual = 'le',
  GreaterThan = 'gt',
  GreaterEqual = 'ge'
}

export enum ConjunctionOperator {
  Or = 'or',
  And = 'and'
}
