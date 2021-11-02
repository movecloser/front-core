// Copyright © 2021 Move Closer

import { ComponentOptions, VueConstructor } from 'vue'
import { createDecorator } from 'vue-class-component'
import { Interfaces } from '../../../contracts'

let Vue: VueConstructor

/**
 * Install function.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
function __install (_Vue: VueConstructor) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: off */
      console.error('[inversify] already installed.')
    }
  } else {
    _Vue.mixin({
      beforeCreate (this: Vue) {
        if (this.$options.container) {
          this.$container = this.$options.container
        } else if (this.$options.parent && this.$options.parent.$container) {
          this.$container = this.$options.parent.$container
        }
      }
    })
  }
}

/**
 * Inject instance of given identifier.
 *
 * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 *
 * @param identifier
 */
export const Inject = (identifier?: Interfaces.ServiceIdentifier<unknown>) => (proto: Vue, key: string): void => {
  let Type: unknown

  if (typeof Reflect !== 'undefined' && typeof Reflect.getMetadata === 'function') {
    Type = Reflect.getMetadata('design:type', proto, key)
  }

  return createDecorator((options: ComponentOptions<Vue>, key) => {
    options.computed = options.computed || {}
    options.computed[key] = function (this: Vue) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return this.$container.get(identifier || Type)
    }
  })(proto, key)
}

/**
 * Install container plugin.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 *
 * @param vue
 */
export const installContainer = (vue: VueConstructor): void => {
  vue.use({
    install: __install
  })
}
