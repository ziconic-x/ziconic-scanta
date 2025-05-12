import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ge'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'always',
    prefixes: {
      en: '/en',
      ge: '/ge',
    },
  },
})
