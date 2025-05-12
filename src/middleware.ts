import { clerkMiddleware } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

const SILENT = process.env.NODE_ENV === 'production'

const log = (name: string, args?: unknown) => {
  if (!SILENT) {
    if (args) {
      console.log(`- Middleware [${name}]`, JSON.stringify(args, null, 2))
    } else {
      console.log(`- Middleware [${name}]`)
    }
  }
}

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  return RegExp(
    `^(/(${routing.locales.join('|')}))?(${pages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  ).test(pathName)
}

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing)

// const isPublicRoute = createRouteMatcher(['/api/webhooks(.*)'])
// const isProtectedRoute = createRouteMatcher(['/:locale', '/:locale/dashboard(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const { nextUrl } = request

  log('nextUrl pathname', nextUrl.pathname)
  const isAuthRoute = testPathnameRegex(['/sign-in'], nextUrl.pathname)
  // TODO: add check for including routes not exact pathname
  const isProtectedRoute = testPathnameRegex(
    ['/', '/dashboard', '/organizations', '/events', '/qr-categories', '/scanner', '/settings'],
    nextUrl.pathname,
  )

  log('middleware started:', nextUrl)

  const next = () => {
    return intlMiddleware(request)
  }

  const { userId, redirectToSignIn } = await auth()

  log('userId', userId)

  log('isProtectedRoute', isProtectedRoute)
  log('isAuthRoute', isAuthRoute)

  if (isAuthRoute && userId) {
    log('Auth route handled')
    return Response.redirect(new URL('/dashboard', nextUrl))
  }

  if (isProtectedRoute) {
    log('Protected route handled')

    if (userId) {
      log('User is signed in')
      return next()
    }

    log('User is not')
    redirectToSignIn({ returnBackUrl: '/' })
  }

  return next()
})

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
