// Copyright (c) 2021 Move Closer

import 'reflect-metadata'

import { AppConfig } from './contracts/bootstrapper'
import { AppModule, Module } from './module'
import { Bootstrapper } from './bootstrapper'
import { Configuration } from './configuration'
import { Container } from './container'
import { IConfiguration, Interfaces, RouterDriver, StoreDriver } from './contracts'

describe('Test Bootstrapper class.', () => {
  const config: AppConfig = {
    modules: [],
    router: RouterDriver.None,
    store: StoreDriver.None
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
        return (bind: Interfaces.Bind) => {
        }
      }
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app with service.', async () => {
    @AppModule({
      name: 'test',
      providers: (config: IConfiguration) => {
        return (bind: Interfaces.Bind) => {
        }
      },
      providersAsync: true,
      routes: () => [],
      state: () => {
      }
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.VueRouter,
      store: StoreDriver.Vuex
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app with module.', async () => {
    @AppModule({
      name: 'test',
      providers: (config: IConfiguration) => {
        return (bind: Interfaces.Bind) => {
        }
      },
      providersAsync: true,
      routes: () => [],
      state: () => {
      }
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.None,
      store: StoreDriver.None
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
  })

  test('Expect [boot] method to bootstrap app without providers.', async () => {
    @AppModule({
      name: 'test',
      // @ts-ignore
      providers: null,
      providersAsync: true,
      routes: () => [],
      state: () => {
      }
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.None,
      store: StoreDriver.None
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

  test('Expect [boot] method to bootstrap app with configuration available in router.', async () => {
    let testConfig: string | null = null

    @AppModule({
      name: 'test',
      routes: (container, configuration) => {
        if (configuration) {
          testConfig = configuration.byKey('lorem')
        }

        return []
      },
      state: () => {
      }
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.VueRouter,
      store: StoreDriver.Vuex,
      lorem: 'ipsum'
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
    expect(testConfig).toBe('ipsum')
  })

  test('Expect [boot] method to bootstrap app with configuration available in boot.', async () => {
    let testConfig: string | null = null

    @AppModule({
      name: 'test',
      routes: () => [],
      state: () => {},
      boot: (container, configuration) => {
        if (configuration) {
          testConfig = configuration.byKey('lorem')
        }
      }
    })
    class TestModule extends Module {}

    const config: AppConfig = {
      modules: [
        TestModule
      ],
      router: RouterDriver.VueRouter,
      store: StoreDriver.Vuex,
      lorem: 'ipsum'
    }

    const bootstrapper = new Bootstrapper(config)
    const result = await bootstrapper.boot()

    expect(result).toBeUndefined()
    expect(testConfig).toBe('ipsum')
  })
})
