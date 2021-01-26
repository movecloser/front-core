import 'reflect-metadata'
import { AsyncContainerModule, Container as Inversify, ContainerModule } from 'inversify'
import { Container } from './container'

describe('Test Container class.', () => {
  const config = {
    test: 'true'
  }
  const container = new Container()

  test('Expect [createContainer] method to create container.', () => {
    container.createContainer(config)
    // @ts-ignore
    expect(container.container).toBeInstanceOf(Inversify)
  })

  test('Expect [createContainer] method to create container.', () => {
    container.createContainer()
    // @ts-ignore
    expect(container.container).toBeInstanceOf(Inversify)
  })

  test('Expect [createModule] method to create module.', () => {
    const result = container.createModule({}, false)
    expect(result).toBeInstanceOf(ContainerModule)
  })

  test('Expect [createModule] method to create async module.', () => {
    const result = container.createModule({}, true)
    expect(result).toBeInstanceOf(AsyncContainerModule)
  })

  test('Expect [getContainer] method to return container.', () => {
    const result = container.getContainer()
    expect(result).toBeInstanceOf(Inversify)
  })

  test('Expect [loadModule] method to load container.',  async () => {
    // @ts-ignore
    const spy = jest.spyOn(container.getContainer(),'load')
    const module = new ContainerModule(() => {})
    await container.loadModule(module)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Expect [loadModule] method to load async container.',  async () => {
    // @ts-ignore
    const spy = jest.spyOn(container.getContainer(),'loadAsync')
    const module = new ContainerModule(() => {})
    await container.loadModule(module, true)

    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Expect [unloadModule] method to return container.', () => {
    // @ts-ignore
    const spy = jest.spyOn(container.getContainer(),'unload')
    const module = new ContainerModule(() => {})
    container.unloadModule(module)

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
