import { parse } from './filter-parser'
import { ConjunctionOperator, FilterOperator, FiltersConfig } from '@/contracts/repositories'
import { IncorrectValueError, MissingParameter } from '@/exceptions/errors'

describe('Test filter parser method', () => {
  test('Expect [parse] method to return Filters when basic values provided', () => {
    const toParse: FiltersConfig = {
      name: 'stefan',
      age: 69,
      active: true,
      passive: false
    }
    const expected = {
      name: 'stefan',
      age: 69,
      active: 1,
      passive: 0
    }

    expect(parse(toParse)).toEqual(expected)
  })

  test('Expect [parse] method to return Filters when FiltersConfig provided', () => {
    const toParse: FiltersConfig = {
      name: {
        operator: FilterOperator.Like,
        value: 'stefan'
      }
    }
    const expected = {
      name: 'lk:stefan',
    }

    expect(parse(toParse)).toEqual(expected)
  })

  test('Expect [parse] method to return Filters when FiltersConfig[] provided', () => {
    const toParse: FiltersConfig = {
        rate: [
          {
            operator: FilterOperator.LessThan,
            value: 3
          }, {
            conjunction: ConjunctionOperator.Or,
            operator: FilterOperator.GreaterThan,
            value: 4
          }
        ]
    }
    const expected = {
      rate: 'lt:3,or:gt:4',
    }

    expect(parse(toParse)).toEqual(expected)
  })

  test('Expect [parse] method to throw IncorrectValueError when incorrect config provided', () => {
    const toParse: FiltersConfig = {
      // @ts-ignore
      rate: () => {}
    }

    expect(() => parse(toParse)).toThrow(IncorrectValueError)
  })

  test('Expect [parse] method to throw IncorrectValueError when incorrect value provided', () => {
    const toParse: FiltersConfig = {
      // @ts-ignore
      rate: null
    }

    expect(() => parse(toParse)).toThrow(IncorrectValueError)
  })

  test('Expect [parse] method to throw IncorrectValueError when incorrect FiltersConfig[] provided', () => {
    const toParse: FiltersConfig = {
      rate: [
        {
          operator: FilterOperator.LessThan,
          // @ts-ignore
          value: null
        }, {
          conjunction: ConjunctionOperator.Or,
          operator: FilterOperator.GreaterThan,
          value: 4
        }
      ]
    }

    expect(() => parse(toParse)).toThrow(IncorrectValueError)
  })

  test('Expect [parse] method to throw MissingParameter when incorrect FiltersConfig[] provided', () => {
    const toParse: FiltersConfig = {
      rate: [
        {
          // @ts-ignore
          operator: null,
        }
      ]
    }

    expect(() => parse(toParse)).toThrow(MissingParameter)
  })
})
