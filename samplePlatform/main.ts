import { Bootstraper} from '@/platforms/vue/bootstrapper'
import config from './config/index'

// if (process.env.VUE_APP_ENV !== 'local') {
//   Sentry.init({
//     dsn: process.env.VUE_APP_SENTRY_DNS_FRONT,
//     environment: process.env.VUE_APP_ENV,
//     release: process.env.VUE_APP_VERSION,
//     integrations: [
//       new Integrations.Vue({
//         Vue,
//         attachProps: true,
//         logErrors: true
//       })
//     ]
//   })
// }

const bootstrapper: Bootstraper = new Bootstraper(config)
bootstrapper.boot()

const { container, router } = bootstrapper.components()

// return new Vue({
//   router,
//   store,
//   container,
//   i18n: I18n,
//   render: h => h(Root)
// })

