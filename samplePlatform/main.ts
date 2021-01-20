import { createApp } from './bootstrap/app'

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

const { container, router, store } = createApp()

// return new Vue({
//   modules,
//   store,
//   container,
//   i18n: I18n,
//   render: h => h(Root)
// })

