import 'reflect-metadata'

import { IConfiguration, Interfaces, RouterDriver, StoreDriver } from './contracts'
import { Bootstrapper } from './bootstrapper'
import { AppConfig } from './contracts/bootstrapper'
import { Configuration } from './configuration'
import { Container } from './container'
import { AppModule, Module } from './module'

describe('Test Bootstrapper class.', () => {
  const config: AppConfig = {
    modules: [],
    router: RouterDriver.None,
    store: StoreDriver.None,
  }

  const bootstrapper = new Bootstrapper(config)

  test('Expect [getConfiguration] method to return app configuration.', () => {
    const result = bootstrapper.getConfiguration()

    expect(result).toBeInstanceOf(Configuration)
  })

  test('Expect [getContainer] method to return app container.', () => {
    const result = bootstrapper.getContainer()

    expect(result).toBeInstanceOf(Container)
  })

  test('Expect [getRoutesStack] method to return app container.', () => {
    const result = bootstrapper.getRoutesStack()

    expect(result).toBeInstanceOf(Array)
  })

  test('Expect [getStoreStack] method to return app container.', () => {
    const result = bootstrapper.getStoreStack()

    expect(result).toBeInstanceOf(Array)
  })

  test('Expect [boot] method to bootstrap minimal app.', async () => {
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app with services.', async () => {
    const config: AppConfig = {
      modules: [],
      router: RouterDriver.None,
      store: StoreDriver.None,
      services: (config: IConfiguration) => {
        return (bind: Interfaces.Bind) => {}
      }
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app with service.', async () => {
    @AppModule({
      name: 'test',
      observers: [
        Symbol.for('IEventbus')
      ],
      providers: (config: IConfiguration) => {
        return (bind: Interfaces.Bind) => {}
      },
      providersAsync: true,
      routes: () => [],
      state: () => {}
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.VueRouter,
      store: StoreDriver.Vuex,
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app with module.', async () => {
    @AppModule({
      name: 'test',
      observers: [
        Symbol.for('IEventbus')
      ],
      providers: (config: IConfiguration) => {
        return (bind: Interfaces.Bind) => {}
      },
      providersAsync: true,
      routes: () => [],
      state: () => {}
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.None,
      store: StoreDriver.None,
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app without providers.', async () => {
    @AppModule({
      name: 'test',
      // @ts-ignore
      observers: null,
      // @ts-ignore
      providers: null,
      providersAsync: true,
      routes: () => [],
      state: () => {}
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.None,
      store: StoreDriver.None,
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app with services.', async () => {
    const config: AppConfig = {
      modules: [],
      router: RouterDriver.None,
      store: StoreDriver.None,
      container: {
        test: 'true'
      }
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })
})
