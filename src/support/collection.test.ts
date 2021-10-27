/*
 * Copyright (c) 2021 Move Closer
 */

import { IMeta } from '../contracts/models'

import { Collection } from './collection'
import { ITest, TestModel } from './model.test'

const emptyCollection = new Collection<TestModel>([])

describe('Test abstract Collection class', () => {
  test('Expect Collection to contain given value', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]

    const collection = new Collection<TestModel>(items)

    expect(collection.length).toEqual(items.length)
    expect(collection[0]).toBeInstanceOf(TestModel)
    expect(collection[1]).toBeInstanceOf(TestModel)
  })

  test('Expect [first] method to contain given value', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]
    const collection = new Collection<TestModel>(items)

    expect(collection.first()).toEqual(items[0])
    expect(collection.first()).toBeInstanceOf(TestModel)
    expect(emptyCollection.first()).toBe(false)
  })

  test('Expect [last] method to contain given value', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]
    const collection = new Collection<TestModel>(items)

    expect(collection.last()).toEqual(items[1])
    expect(collection.last()).toBeInstanceOf(TestModel)
    expect(emptyCollection.last()).toBe(false)
  })

  test('Expect Collection to have it\'s meta set by setter', () => {
    const collection = new Collection<ITest>()
    const meta: IMeta = {
      length: 0,
      page: 1
    }

    collection.meta = meta

    expect(collection.meta).toEqual(meta)
    expect(collection.meta).not.toEqual({ ...meta, error: true })
  })

  test('Expect Collection to have it\'s meta set in constructor', () => {
    const items: TestModel[] = []
    const meta: IMeta = {
      length: 0,
      page: 1
    }
    const collection = new Collection<TestModel>(items, meta)

    expect(collection.meta).toBeTruthy()
    expect(collection.meta).toEqual(meta)
  })

  test('Expect Collection to be properly instantiated by constructor', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]
    const meta: IMeta = {
      length: 0,
      page: 1
    }
    const collection = new Collection(items, meta)

    expect(collection.meta).toEqual(meta)
    expect([...collection]).toEqual(items)
  })


  test('Expect [getItem] method to return for matching element', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]
    const collection = new Collection<TestModel>(items)
    const collectionElement = collection.getItem((item: TestModel) => {
      return item.get('id') === 1
    })
    const nonExistentElement = collection.getItem((item: TestModel) => {
      return item.get('id') === 3
    })

    expect(collectionElement).toBeTruthy()
    // @ts-ignore
    expect(collectionElement.get('id')).toBe(1)
    expect(nonExistentElement).toBe(false)
  })

  test('Expect [hasItem] method to check for matching element', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]
    const collection = new Collection<TestModel>(items)
    const collectionElement = collection.hasItem((item: TestModel) => {
      return item.get('id') === 1
    })
    const nonExistentElement = collection.hasItem((item: TestModel) => {
      return item.get('id') === 3
    })

    expect(collectionElement).toBe(true)
    expect(nonExistentElement).toBe(false)
  })

  test('Expect [hasItems] method to check for existing elements', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]
    const collection = new Collection<TestModel>(items)

    expect(collection.hasItems()).toBe(true)
    expect(emptyCollection.hasItems()).toBe(false)
  })

  test('Expect [isEmpty] method to indicate no elements', () => {
    const items: TestModel[] = [
      new TestModel({ id: 1, name: 'Item 1', value: 1 }),
      new TestModel({ id: 2, name: 'Item 2', value: 2 })
    ]
    const collection = new Collection<TestModel>(items)

    expect(collection.isEmpty()).toBeFalsy()
    expect(emptyCollection.isEmpty()).toBeTruthy()
  })
})
