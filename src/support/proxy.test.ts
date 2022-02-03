// Copyright (c) 2021 Move Closer

import { ModelPayload } from '../contracts/models'
import { Intersected, Proxable } from '../contracts/support'

import { createProxy } from './proxy'

interface TestContract {
  getPerson (): string
  hello (): string
  setPerson (person: string): void
}

interface TestData extends ModelPayload {
  greeting: string
  person: string | null
}

const textValue = 'Hello'
const initData = { greeting: textValue, person: null }
const errorMsg = 'Cannot invoke this class'

class TestClass implements Proxable<TestData>, TestContract {
  protected data: TestData = {
    greeting: textValue,
    person: null
  }

  public static hi (person: string): string {
    const me = new this
    me.__set('person', person)
    return me.hello()
  }

  getPerson (): string {
    return this.data.person || ''
  }

  hello (): string {
    return `${this.data.greeting} ${this.data.person}`
  }

  setPerson (person: string): void {
    this.data.person = person
  }

  public __get (property: string): any {
    return this.data[property]
  }

  public __invoke (...data: any): any {
    throw new Error(errorMsg)
  }

  public __set (property: string, value: any): boolean {
    this.data[property] = value
    return true
  }

  public __toObject (): TestData {
    return this.data
  }
}

describe('New Model class', () => {
  const newPerson: string = 'John'
  let model: Intersected<TestClass, TestData>

  beforeEach(() => {
    model = createProxy(new TestClass())
  })

  test('Expect magic getter to return value', () => {
    expect(model.greeting).toEqual(textValue)
  })

  test('Expect magic getter to return value', () => {
    expect(null).toEqual(null)
  })

  test('Expect function getter to return greeting', () => {
    expect(model.__get('greeting')).toEqual(textValue)
  })

  test('Expect magic setter to change value', () => {
    model.person = newPerson
    expect(model.person).toEqual(newPerson)
  })

  test('Expect setter function to change value', () => {
    model.__set('person', newPerson)
    expect(model.person).toEqual(newPerson)
  })

  test('Expect function call to be executed', () => {
    model.person = newPerson
    expect(model.hello()).toEqual('Hello John')
  })

  test('Expect spread to return data', () => {
    expect({ ...model }).toEqual(initData)
  })

  test('Expect static works as static', () => {
    expect(TestClass.hi('John')).toEqual('Hello John')
  })

  test('Expect [hasOwnProperty] to work', () => {
    expect(model.hasOwnProperty('greeting')).toBe(true)
    expect(model.greeting).toBe('Hello')
  })
})
