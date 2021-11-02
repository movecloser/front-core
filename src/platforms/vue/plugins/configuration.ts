// Copyright © 2021 Move Closer

import { VueConstructor } from 'vue'

let Vue: VueConstructor

/**
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 */
function initConfiguration (this: Vue) {
  if (this.$options.configuration) {
    this.$configuration = this.$options.configuration
  } else if (this.$options.parent && this.$options.parent.$configuration) {
    this.$configuration = this.$options.parent.$configuration
  }
}

function install (_Vue: VueConstructor): void {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint no-console: off */
      console.error('[configuration] already installed.')
    }
  } else {
    _Vue.mixin({ beforeCreate: initConfiguration })
  }
}

export default { install }
