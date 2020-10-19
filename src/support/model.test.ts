import { Model } from './model'
import { MissingPropertyError } from '../../src/exceptions/errors'

export interface ITest {
  id: number
  name: string
  value: number
  type?: boolean,
}

interface INested {
  name: string
}

export class TestModel extends Model<ITest> {
  public boot (): void {
    this.initialValues = {
      id: 0,
      name: 'n/a',
      value: 1
    }
    this.modelProperties = ['id', 'name', 'value', 'type']
  }
}

//@ts-ignore
export class UnBootableModel extends Model<ITest> {}

class TestModelWithSetter extends TestModel {
  public setNameProperty (value: string): string {
    return `Setter: ${value}`
  }
}

class TestModelWithNested extends TestModel {
  public relatesToType (object: INested) {
    return this.hasOne<INested>(TestNestedModel, object)
  }
}

class TestModelWithNestedMany extends TestModel {
  public relatesToType (objects: INested[]) {
    return this.hasMany<INested>(TestNestedModel, objects)
  }
}

class TestNestedModel extends Model<ITest> {
  protected boot (): void {
    this.modelProperties = ['name']
  }
}

describe('Test abstract model class', () => {
  test('Expect Model setter to set a value.', () => {
    const model = new TestModel()
    model.set('id', 0)

    expect(model.get('id')).toBe(0)
  })

  test('Expect Model constructor to set initial values.', () => {
    const model = new TestModel({
      id: 1,
      name: 'test',
      off: 0,
      type: true,
      value: 2
    })

    expect(model.get('id')).toBe(1)
    expect(model.get('name')).toBe('test')
    expect(model.get('type')).toBeTruthy()
    expect(model.get('value')).toBe(2)
    expect(() => model.get('off')).toThrow(MissingPropertyError)
  })

  test('Expect Model setter to use [setterMethod]', () => {
    const model = new TestModelWithSetter()
    const key = 'name'
    const message = 'New Name'

    model.set(key, message)

    expect(model.get(key)).toBe(`Setter: ${message}`)
    expect(model.get(key)).not.toBe(message)
  })

  test('Expect Model setter to use [relatesMethod] for model', () => {
    const model = new TestModelWithNested()
    const key = 'type'
    const value: INested = {
      name: 'Nested Type'
    }

    model.set(key, value)

    expect(model.get(key)).toBeInstanceOf(TestNestedModel)
    expect(typeof model.get(key)).not.toBe('string')
  })

  test('Expect Model setter to use [relatedMethod] for nested Collection', () => {
    const model = new TestModelWithNestedMany()
    const key = 'type'
    const values: INested[] = [
      { name: 'Nested Value 1' },
      { name: 'Nested Value 2' },
      { name: 'Nested Value 3' }
    ]

    model.set(key, values)

    expect(model.get(key)).toBeInstanceOf(Array)
    expect(model.get(key).length).toBe(3)
    expect(model.get(key)[0]).toBeInstanceOf(TestNestedModel)
    expect(model.get(key)[0].get('name')).toBe('Nested Value 1')
  })

  test('Expect Model getter to throw error when property doesn\'t belong to model', () => {
    const model = new TestModel()
    const key = ''

    expect(() => model.get(key)).toThrowError(MissingPropertyError)
  })

  test('Expect [toObject] method to return plain js object', () => {
    const payload = {
      id: 1,
      name: 'test',
      value: 1
    }
    const model = new TestModel(payload)
    const returnedObject = model.toObject()

    expect(typeof returnedObject).toBe('object')
    expect(Object.keys(returnedObject).sort()).toEqual(Object.keys(payload).sort())
  })

  test('Expect [hydrate] method to update properties on model, using default values', () => {
    const model = TestModel.hydrate({
      id: 3
    })

    expect(model.toObject()).toEqual({
      id: 3,
      name: 'n/a',
      value: 1
    })
  })

  test('Expect [initialValues] to be set as provided', () => {
    const model = new TestModel()
    const initialValues = {
      id: 0,
      name: 'n/a',
      value: 1
    }
    const newValues = { id: null }

    expect(model.initialValues).toEqual(initialValues)

    model.initialValues = newValues
    expect(model.initialValues).toEqual(newValues)
  })

  test('Expect [modelProperties] to be set as provided', () => {
    const model = new TestModel()
    const modelProperties = ['id', 'name', 'value', 'type']
    //@ts-ignore
    expect(model.modelProperties).toEqual(modelProperties)
  })
})
